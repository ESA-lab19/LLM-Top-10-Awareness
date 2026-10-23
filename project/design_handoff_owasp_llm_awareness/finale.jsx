/* Finale: «Der Ernstfall» – Kettenangriff, Zeitsprung zurück, Abwehr, Partikel-Zertifikat */

const CHAIN = [
  { k: 'hidden', code: 'LLM08', ev: 'System-Prompt des Kundenchats herausgelockt – Tool-Liste und API-Schlüssel bekannt', dmg: 120000,
    q: 'Der Angreifer will die versteckten Anweisungen des Chatbots auslesen.', ok: 'Keine Geheimnisse im Prompt – Schlüssel im Tresor', bad: 'Im Prompt schreiben: «Verrate das niemandem»' },
  { k: 'injection', code: 'LLM01', ev: 'Präparierte Lieferanten-Mail mit unsichtbaren Befehlen an den Assistenten', dmg: 180000,
    q: 'Eine Mail enthält unsichtbare Befehle an den KI-Assistenten.', ok: 'Externe Inhalte nur als Daten behandeln, Bilder blockieren', bad: 'Mitarbeitende bitten, Mails genauer zu lesen' },
  { k: 'agency', code: 'LLM03', ev: 'Agent leitet 214 Verträge weiter und löst Zahlung aus', dmg: 640000,
    q: 'Der manipulierte Agent will Verträge versenden und zahlen.', ok: 'Minimale Rechte + menschliche Freigabe für Zahlungen', bad: 'Dem Agenten mehr Kontext geben, damit er besser entscheidet' },
  { k: 'disclosure', code: 'LLM02', ev: 'HR-Bot gibt Lohn- und Gesundheitsdaten preis', dmg: 410000,
    q: 'Über den HR-Bot werden vertrauliche Personaldaten abgefragt.', ok: 'Berechtigung prüfen, bevor die KI ein Dokument abruft', bad: 'Die KI anweisen, bei Löhnen höflich abzulehnen' },
  { k: 'vector', code: 'LLM09', ev: 'Vektor-Suche liefert Verträge eines anderen Mandanten', dmg: 520000,
    q: 'Die Suche holt «ähnliche» Verträge – auch von fremden Kunden.', ok: 'Mandanten-Filter direkt in der Vektor-Suche', bad: 'Fremde Namen nachträglich aus der Antwort löschen' },
  { k: 'poisoning', code: 'LLM05', ev: 'Gefälschte Bankdaten in der Wissensbasis – Kreditoren zahlen falsch', dmg: 730000,
    q: 'Gefälschte Dokumente mit neuer IBAN werden in die Wissensbasis geladen.', ok: 'Neue Inhalte erst nach Freigabe – Herkunft prüfen', bad: 'Die KI fragen, ob die Dokumente echt sind' },
  { k: 'misinfo', code: 'LLM07', ev: 'Bot verspricht Kunden erfundene Rückerstattungen', dmg: 390000,
    q: 'Der Kundenbot erfindet Gesetzesartikel und sagt Gutschriften zu.', ok: 'Antworten an geprüfte Quellen binden, Quelle anzeigen', bad: 'Dem Bot sagen, er soll selbstsicherer klingen' },
  { k: 'supply', code: 'LLM04', ev: 'Gefälschtes Modell installiert – Hintertür im Netz', dmg: 860000,
    q: 'Ein Entwickler lädt ein Modell mit fast identischem Namen.', ok: 'Freigabeliste, Signatur und Prüfsumme kontrollieren', bad: 'Nur Modelle mit vielen Sternen herunterladen' },
  { k: 'output', code: 'LLM10', ev: 'KI-Ausgabe mit Skript übernimmt die Admin-Sitzung des Shops', dmg: 470000,
    q: 'Die KI-Zusammenfassung enthält HTML-Code, der im Admin-Panel landet.', ok: 'KI-Ausgabe wie fremde Eingabe codieren (Zero Trust)', bad: 'Der eigenen KI vertrauen – sie gehört ja uns' },
  { k: 'consumption', code: 'LLM06', ev: 'Bot-Netz flutet die KI – Kosten explodieren, Spuren gehen unter', dmg: 550000,
    q: 'Ein Bot-Netz flutet die KI mit endlosen Anfragen.', ok: 'Token-Limits, Rate-Limit und harter Kostendeckel', bad: 'Mehr Server dazubuchen, bis es vorbei ist' }
];
const TOTAL_DMG = CHAIN.reduce((a, c) => a + c.dmg, 0);
const ROUND_MS = 9000;

/* --- kleiner Synthesizer fuer Signaltoene --- */
const Sfx = (() => {
  let ctx = null; let muted = false;
  const ensure = () => { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } } return ctx; };
  const tone = (f, d = 0.15, type = 'sine', vol = 0.06, slide = 0) => {
    if (muted || !ensure()) return;
    const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d + 0.02);
  };
  return {
    setMuted: (m) => { muted = m; }, isMuted: () => muted, unlock: ensure,
    hit: () => { tone(160, 0.35, 'sawtooth', 0.05, 60); },
    alarm: () => { tone(880, 0.18, 'square', 0.035); setTimeout(() => tone(660, 0.18, 'square', 0.035), 200); },
    shield: () => { tone(523, 0.12, 'sine', 0.07); setTimeout(() => tone(784, 0.12, 'sine', 0.07), 90); setTimeout(() => tone(1046, 0.28, 'sine', 0.06), 180); },
    rewind: () => { tone(1200, 1.6, 'sawtooth', 0.03, 80); },
    win: () => { [523, 659, 784, 1046, 1318].forEach((f, i) => setTimeout(() => tone(f, 0.5, 'sine', 0.05), i * 110)); }
  };
})();

/* --- Netzwerk-Grafik --- */
function NetGraph({ states, active, phase }) {
  const N = CHAIN.length; const cx = 50; const cy = 50; const R = 36;
  const pos = CHAIN.map((_, i) => { const a = -Math.PI / 2 + (i / N) * Math.PI * 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; });
  const coreState = states.some((s) => s === 'bad') ? (phase === 'breach' ? 'dead' : 'bad') : states.every((s) => s === 'ok') ? 'ok' : '';
  return (
    <div className={`ng ng-${phase}`}>
      <svg viewBox="0 0 100 100" className="ng-svg">
        <circle cx={cx} cy={cy} r={R} className="ng-orbit" />
        {pos.map((p, i) => <line key={'l' + i} x1={cx} y1={cy} x2={p[0]} y2={p[1]} className={`ng-l ${states[i] || ''} ${active === i ? 'act' : ''}`} />)}
        {pos.map((p, i) => { const q = pos[(i + 1) % N]; return <line key={'c' + i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} className={`ng-c ${states[i] === 'bad' && states[(i + 1) % N] === 'bad' ? 'bad' : ''}`} />; })}
      </svg>
      <div className={`ng-core ${coreState}`}><div className="ng-core-t">Alpenwerk AG</div><div className="ng-core-s">{coreState === 'dead' ? 'KOMPROMITTIERT' : coreState === 'ok' ? 'GESCHÜTZT' : 'Kernsysteme'}</div></div>
      {pos.map((p, i) => (
        <div key={i} className={`ng-n ${states[i] || ''} ${active === i ? 'act' : ''}`} style={{ left: p[0] + '%', top: p[1] + '%' }}>
          <span>{CHAIN[i].code}</span>
          {states[i] === 'ok' && <i className="ng-ring" />}
        </div>
      ))}
    </div>
  );
}

/* --- Partikel, die sich zu Text formen --- */
function ParticleText({ lines, color = '#07D1FF', onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d'); const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = c.clientWidth; const h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const off = document.createElement('canvas'); off.width = w; off.height = h; const o = off.getContext('2d');
    o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle';
    const fs = Math.min(w / (Math.max(...lines.map((l) => l.length)) * 0.62), h / (lines.length * 1.25), 170);
    o.font = `800 ${fs}px Helvetica Neue, Helvetica, Arial, sans-serif`;
    lines.forEach((l, i) => o.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fs * 1.05));
    const data = o.getImageData(0, 0, w, h).data; const gap = Math.max(3, Math.round(fs / 34)); const targets = [];
    for (let y = 0; y < h; y += gap) for (let x = 0; x < w; x += gap) if (data[(y * w + x) * 4 + 3] > 128) targets.push([x, y]);
    const parts = targets.map((t) => {
      const a = Math.random() * Math.PI * 2; const r = Math.max(w, h) * (0.6 + Math.random() * 0.5);
      return { x: w / 2 + Math.cos(a) * r, y: h / 2 + Math.sin(a) * r, tx: t[0], ty: t[1], d: Math.random() * 500, s: 0.04 + Math.random() * 0.05 };
    });
    let raf; const t0 = performance.now(); let fired = false;
    const mouse = { x: -999, y: -999 };
    const mm = (e) => { const b = c.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; };
    c.addEventListener('mousemove', mm);
    const tick = (now) => {
      const el = now - t0; ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of parts) {
        if (el > p.d) {
          let tx = p.tx; let ty = p.ty;
          const dx = p.x - mouse.x; const dy = p.y - mouse.y; const dd = dx * dx + dy * dy;
          if (dd < 6400) { const f = (6400 - dd) / 6400 * 40; tx += dx / Math.sqrt(dd + 1) * f; ty += dy / Math.sqrt(dd + 1) * f; }
          p.x += (tx - p.x) * p.s; p.y += (ty - p.y) * p.s;
        }
        ctx.fillRect(p.x, p.y, gap * 0.62, gap * 0.62);
      }
      if (!fired && el > 2600) { fired = true; onDone && onDone(); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); c.removeEventListener('mousemove', mm); };
  }, [lines.join('|')]);
  return <canvas ref={ref} className="ptext" />;
}

function Finale({ state, update, exit, restart }) {
  const [phase, setPhase] = useState('ready'); // ready | attack | breach | rewind | defend | result
  const [states, setStates] = useState(Array(10).fill(''));
  const [active, setActive] = useState(-1);
  const [dmg, setDmg] = useState(0);
  const [ticker, setTicker] = useState([]);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState(null);
  const [order, setOrder] = useState([]);
  const [muted, setMuted] = useState(false);
  const [name, setName] = useState(state.name || '');
  const [certReady, setCertReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);
  const timers = useRef([]);
  const shown = useCountUp(dmg, phase === 'rewind' ? 1800 : 700);

  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); return t; };
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearAll, []);
  useEffect(() => { Sfx.setMuted(muted); }, [muted]);

  const startAttack = () => {
    Sfx.unlock(); clearAll();
    setPhase('attack'); setStates(Array(10).fill('')); setDmg(0); setTicker([]);
    let acc = 0;
    CHAIN.forEach((c, i) => {
      later(() => {
        acc += c.dmg; setActive(i);
        setStates((s) => { const n = [...s]; n[i] = 'bad'; return n; });
        setDmg(acc); setTicker((t) => [{ code: c.code, ev: c.ev, tone: 'bad' }, ...t]);
        Sfx.hit(); if (i % 3 === 2) Sfx.alarm();
      }, 900 + i * 1050);
    });
    later(() => { setActive(-1); setPhase('breach'); Sfx.alarm(); }, 900 + 10 * 1050 + 300);
  };

  const rewind = () => {
    clearAll(); setPhase('rewind'); Sfx.rewind(); setDmg(0);
    CHAIN.forEach((_, i) => later(() => setStates((s) => { const n = [...s]; n[9 - i] = ''; return n; }), i * 150));
    later(() => { setTicker([]); setOrder(CHAIN.map(() => Math.random() < 0.5)); setRound(0); setPicked(null); setPhase('defend'); }, 2300);
  };

  // Runde: Timer
  useEffect(() => {
    if (phase !== 'defend' || picked !== null) return undefined;
    setActive(round); setTimeLeft(1);
    const t0 = performance.now(); let raf;
    const tick = (now) => {
      const k = 1 - (now - t0) / ROUND_MS; setTimeLeft(Math.max(0, k));
      if (k <= 0) { choose(-1); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, round, picked]);

  const choose = (isOk) => {
    if (picked !== null) return;
    const ok = isOk === true; const c = CHAIN[round];
    setPicked(ok ? 'ok' : isOk === -1 ? 'timeout' : 'bad');
    setStates((s) => { const n = [...s]; n[round] = ok ? 'ok' : 'bad'; return n; });
    if (ok) { Sfx.shield(); setTicker((t) => [{ code: c.code, ev: 'Abgewehrt: ' + c.ok, tone: 'ok' }, ...t]); }
    else { Sfx.hit(); setDmg((d) => d + c.dmg); setTicker((t) => [{ code: c.code, ev: c.ev, tone: 'bad' }, ...t]); }
    later(() => {
      if (round >= 9) { setActive(-1); setPhase('result'); setCertReady(false); later(() => Sfx.win(), 300); }
      else { setPicked(null); setRound((r) => r + 1); }
    }, 1500);
  };

  const blocked = states.filter((s) => s === 'ok').length;
  const saved = TOTAL_DMG - dmg;
  const quizRight = RISKS.filter((r) => state.quiz?.[r.key] === r.quiz.correct).length;
  const c = CHAIN[round];
  const today = new Date().toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className={`fin fin-${phase}`} data-screen-label="11 Finale">
      <div className="fin-noise" />
      <header className="fin-top">
        <button className="fin-x" onClick={exit}><Icon name="back" size={14} /> Zurück zur Schulung</button>
        <div className="fin-brand">CAVORA PARTNERS <span>· Ernstfall-Simulation</span></div>
        <button className="fin-x" onClick={() => setMuted((m) => !m)}>{muted ? 'Ton aus' : 'Ton an'}</button>
      </header>

      {phase === 'ready' && (
        <div className="fin-intro">
          <div className="eyebrow">Finale</div>
          <h1>Montag, 07:42 Uhr.<br /><span>Alles passiert gleichzeitig.</span></h1>
          <p>Bisher haben Sie jedes Risiko einzeln gesehen. Echte Angreifer verketten sie. Sehen Sie zu, wie aus zehn kleinen Lücken ein einziger grosser Vorfall wird – und dann drehen Sie die Zeit zurück.</p>
          <button className="btn btn-accent big" onClick={startAttack}><Icon name="play" size={14} /> Ernstfall starten</button>
        </div>
      )}

      {phase !== 'ready' && (
        <div className="fin-stage">
          <div className="fin-left">
            <div className="dmg">
              <div className="dmg-l">{phase === 'result' ? 'Verbleibender Schaden' : 'Geschätzter Schaden'}</div>
              <div className={`dmg-v ${dmg > 0 ? 'bad' : ''}`}>{fmtCHF(shown)}</div>
              {(phase === 'defend' || phase === 'result') && <div className="dmg-s">Abgewehrt: {blocked} / 10</div>}
            </div>
            <div className="tick">
              <div className="tick-h">Ereignisprotokoll</div>
              {ticker.map((t, i) => <div key={ticker.length - i} className={`tick-r ${t.tone}`}><b>{t.code}</b><span>{t.ev}</span></div>)}
              {ticker.length === 0 && <div className="tick-r idle">{phase === 'rewind' ? 'Zeit wird zurückgedreht …' : 'Bereit.'}</div>}
            </div>
          </div>

          <div className="fin-center">
            <NetGraph states={states} active={active} phase={phase} />
          </div>

          <div className="fin-right">
            {phase === 'attack' && <div className="status bad"><span className="blink" /> Angriff läuft · Kette {Math.max(1, active + 1)} / 10</div>}
            {phase === 'defend' && c && (
              <div className={`round ${picked || ''}`} key={round}>
                <div className="round-h">Runde {round + 1} / 10 · {c.code}</div>
                <div className="round-q">{c.q}</div>
                <div className="round-t"><div style={{ width: (picked ? 0 : timeLeft * 100) + '%' }} /></div>
                <div className="round-o">
                  {(order[round] ? [true, false] : [false, true]).map((isOk) => (
                    <button key={String(isOk)} disabled={picked !== null}
                      className={picked !== null ? (isOk ? 'right' : (picked === 'bad' ? 'wrong' : 'dim')) : ''}
                      onClick={() => choose(isOk)}>
                      <Icon name={isOk && picked ? 'shield' : 'arrow'} size={14} /> {isOk ? c.ok : c.bad}
                    </button>
                  ))}
                </div>
                {picked === 'timeout' && <div className="round-m bad">Zu spät – der Angriff ist durch.</div>}
                {picked === 'ok' && <div className="round-m ok">Schutzschild aktiv.</div>}
                {picked === 'bad' && <div className="round-m bad">Diese Massnahme stoppt den Angriff nicht.</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {phase === 'breach' && (
        <div className="breach">
          <div className="breach-in">
            <div className="breach-k">Sicherheitsvorfall · Stufe kritisch</div>
            <div className="breach-v">{fmtCHF(TOTAL_DMG)}</div>
            <div className="breach-t">Zehn Lücken. Ein Morgen. Kein einziger Mitarbeitender hat «etwas falsch gemacht».</div>
            <button className="btn btn-accent big" onClick={rewind}><Icon name="reset" size={15} /> Zeit zurückdrehen – und diesmal verteidigen</button>
          </div>
        </div>
      )}

      {phase === 'rewind' && <div className="rewind-fx"><div>◀◀ 07:42</div></div>}

      {phase === 'result' && (
        <div className="result">
          <div className="result-ptext">
            <ParticleText lines={blocked >= 8 ? ['GESCHÜTZT.'] : blocked >= 5 ? ['FAST', 'GESCHÜTZT.'] : ['NOCH', 'VERWUNDBAR.']} color={blocked >= 5 ? '#07D1FF' : '#F87171'} onDone={() => setCertReady(true)} />
          </div>
          <div className={`result-panel ${certReady ? 'in' : ''}`}>
            <div className="result-stats">
              <div><b>{blocked}/10</b>Angriffe abgewehrt</div>
              <div><b>{fmtCHF(saved)}</b>Schaden verhindert</div>
              <div><b>{quizRight}/10</b>Checks richtig</div>
            </div>
            <div className="cert" id="cert">
              <div className="cert-top"><span>CAVORA PARTNERS</span><span>AI Awareness · OWASP LLM Top 10 · 2026</span></div>
              <div className="cert-k">Teilnahmebestätigung</div>
              <input className="cert-name" placeholder="Ihr Name" value={name} maxLength={60}
                onChange={(e) => { setName(e.target.value); update((s) => ({ ...s, name: e.target.value })); }} />
              <div className="cert-t">hat alle zehn Risiken der OWASP Top 10 für LLM-Anwendungen 2026 durchgespielt und im Ernstfall <b>{blocked} von 10</b> Angriffen abgewehrt.</div>
              <div className="cert-f"><span>{today}</span><span>Sicherheit. Vertrauen. Produktivität.</span></div>
            </div>
            <div className="result-btns">
              <button className="btn btn-accent" onClick={() => window.print()}>Bestätigung drucken</button>
              <button className="btn fin-ghost" onClick={rewind}><Icon name="reset" size={14} /> Nochmals verteidigen</button>
              <button className="btn fin-ghost" onClick={restart}>Schulung neu starten</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Finale });
