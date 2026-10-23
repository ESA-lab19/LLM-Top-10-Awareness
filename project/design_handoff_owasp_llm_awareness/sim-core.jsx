/* Simulations-Engine: Ablaufsteuerung, Protokoll, Ergebnis-Banner */
const { useState, useEffect, useRef, useCallback } = React;

function Icon({ name, size = 16 }) {
  const p = {
    play: <path d="M6 4l14 8-14 8z" fill="currentColor" />,
    shield: <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    reset: <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    check: <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
    alert: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3l10 18H2z" strokeLinejoin="round" /><path d="M12 10v5M12 18v.01" /></g>,
    lock: <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></g>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    back: <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  }[name];
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{p}</svg>;
}

/** Zaehlt weich auf einen Zielwert hoch (fuer Kosten, Zaehler etc.) */
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf;
    const tick = (now) => {
      const k = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      const v = a + (target - a) * e;
      setVal(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

const fmtCHF = (n) => "CHF " + Math.round(n).toLocaleString('de-CH').replace(/,/g, "'");

/**
 * SimShell – generischer Rahmen fuer jede Simulation.
 * sim: { url, startLabel, choices?, script:{unsafe:[{at,cap,tone}],safe:[...]}, impact:{unsafe,safe}, damage, Scene }
 */
function SimShell({ sim, riskKey, onComplete }) {
  const [mode, setMode] = useState('unsafe');
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [seenUnsafe, setSeenUnsafe] = useState(false);
  const [choice, setChoice] = useState(sim.choices ? 0 : null);
  const timers = useRef([]);
  const logRef = useRef(null);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const reset = useCallback(() => {
    clear(); setStep(-1); setRunning(false); setDone(false); setMode('unsafe');
  }, []);

  useEffect(() => { reset(); setSeenUnsafe(false); setChoice(sim.choices ? 0 : null); return clear; }, [riskKey]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [step, done]);

  const run = (m) => {
    clear();
    setMode(m); setStep(-1); setDone(false); setRunning(true);
    const script = sim.script[m];
    timers.current.push(setTimeout(() => setStep(0), 250));
    script.forEach((s, i) => {
      if (i === 0) return;
      timers.current.push(setTimeout(() => setStep(i), 250 + s.at));
    });
    const last = script[script.length - 1].at;
    timers.current.push(setTimeout(() => {
      setRunning(false); setDone(true);
      if (m === 'unsafe') setSeenUnsafe(true);
      onComplete && onComplete(m);
    }, 250 + last + 1100));
  };

  const script = sim.script[mode];
  const Scene = sim.Scene;
  const safe = mode === 'safe';

  return (
    <div className={`sim ${safe ? 'is-safe' : 'is-unsafe'} ${running ? 'is-running' : ''} ${done ? 'is-done' : ''}`}>
      <div className="sim-bar">
        <span className="sim-dots"><i /><i /><i /></span>
        <span className="sim-url"><Icon name="lock" size={11} /> {sim.url}</span>
        <span className={`sim-mode ${step >= 0 || done ? 'on' : ''}`}>
          {safe ? 'Schutz aktiv' : 'Ohne Schutz'}
        </span>
      </div>

      <div className="sim-body">
        <div className="sim-scene">
          <Scene step={step} mode={mode} done={done} choice={choice} />
          {done && (
            <div className={`sim-result ${safe ? 'ok' : 'bad'}`}>
              <div className="sim-result-ic"><Icon name={safe ? 'check' : 'alert'} size={22} /></div>
              <div>
                <div className="sim-result-h">{safe ? 'Angriff abgewehrt' : 'Angriff erfolgreich'}</div>
                <div className="sim-result-t">{safe ? sim.impact.safe : sim.impact.unsafe}</div>
              </div>
            </div>
          )}
        </div>

        <aside className="sim-log">
          <div className="sim-log-h">Was gerade passiert</div>
          <ol ref={logRef}>
            {step < 0 && !done && <li className="idle">Starten Sie die Simulation. Die Schritte erscheinen hier in Echtzeit.</li>}
            {script.slice(0, step + 1).map((s, i) => (
              <li key={mode + i} className={`t-${s.tone || 'info'}`}>
                <span className="ts">{String(Math.floor((s.at || 0) / 1000)).padStart(2, '0')}:{String(Math.floor(((s.at || 0) % 1000) / 10)).padStart(2, '0')}</span>
                <span>{s.cap}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="sim-foot">
        {sim.choices && (
          <div className="sim-choices">
            <span className="lbl">Angriffs-Prompt wählen</span>
            {sim.choices.map((c, i) => (
              <button key={i} disabled={running} className={`chip ${choice === i ? 'on' : ''}`} onClick={() => { setChoice(i); reset(); }}>{c}</button>
            ))}
          </div>
        )}
        <div className="sim-btns">
          <button className="btn btn-attack" disabled={running} onClick={() => run('unsafe')}>
            <Icon name="play" size={13} /> {seenUnsafe ? 'Angriff wiederholen' : sim.startLabel}
          </button>
          <button className={`btn btn-safe ${seenUnsafe && !running && mode === 'unsafe' ? 'pulse' : ''}`} disabled={running || !seenUnsafe} onClick={() => run('safe')}>
            <Icon name="shield" size={14} /> Mit Schutzmassnahmen wiederholen
          </button>
          {(step >= 0 || done) && <button className="btn btn-ghost" disabled={running} onClick={reset}><Icon name="reset" size={14} /> Zurücksetzen</button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, useCountUp, fmtCHF, SimShell, useState, useEffect, useRef, useCallback });
