/* App-Shell: Navigation, Intro, Risikoseiten, Fortschritt */

const STORE_KEY = 'cavora-owasp-llm-2026';
const loadState = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
};

function IntroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    let w, h, raf; const dpr = Math.min(2, window.devicePixelRatio || 1);
    const pts = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0006, vy: (Math.random() - .5) * .0006 }));
    const resize = () => { w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); window.addEventListener('resize', resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < 150) { ctx.strokeStyle = `rgba(7,209,255,${(1 - d / 150) * .18})`; ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(7,209,255,.55)'; ctx.beginPath(); ctx.arc(pts[i].x * w, pts[i].y * h, 1.6, 0, 6.3); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} />;
}

function Intro({ go }) {
  return (
    <section className="intro" data-screen-label="00 Intro">
      <IntroCanvas />
      <div className="intro-in">
        <div className="eyebrow">Cavora Partners · AI Awareness</div>
        <h1>Zehn Wege, wie Ihre KI <span>gegen Sie arbeitet.</span></h1>
        <p className="intro-lead">Die OWASP Top 10 für LLM-Anwendungen 2026 – in einfachen Worten erklärt und live simuliert. Erleben Sie jeden Angriff zuerst ungeschützt. Dann mit Schutz.</p>
        <div className="intro-cta">
          <button className="btn btn-accent" onClick={() => go(0)}>Schulung starten <Icon name="arrow" size={15} /></button>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>Fiktives Unternehmen: Alpenwerk AG, Logistik, 340 Mitarbeitende</span>
        </div>
        <div className="intro-grid">
          {RISKS.map((r, i) => (
            <button key={r.code} className="ig" onClick={() => go(i)}><span className="code">{r.code}</span>{r.title.join(' ')}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quiz({ quiz, answer, onAnswer }) {
  const answered = answer !== undefined;
  return (
    <div className="card quiz">
      <div className="card-h">Kurzer Check</div>
      <div className="quiz-q">{quiz.q}</div>
      <div className="quiz-o">
        {quiz.options.map((o, i) => {
          let cls = '';
          if (answered && i === quiz.correct) cls = 'right';
          else if (answered && i === answer) cls = 'wrong';
          return <button key={i} className={cls} disabled={answered} onClick={() => onAnswer(i)}>{o}</button>;
        })}
      </div>
      {answered && <div className="quiz-x">{answer === quiz.correct ? '✓ ' : 'Nicht ganz. '}{quiz.explain}</div>}
    </div>
  );
}

function RiskPage({ idx, state, update, go }) {
  const r = RISKS[idx];
  const sim = SIMS[r.key];
  const prog = state.sims?.[r.key] || {};
  const unlocked = prog.unsafe || prog.safe;
  const onComplete = (m) => update((s) => ({ ...s, sims: { ...s.sims, [r.key]: { ...(s.sims?.[r.key] || {}), [m]: true } } }));
  const onAnswer = (i) => update((s) => ({ ...s, quiz: { ...s.quiz, [r.key]: i } }));

  return (
    <div className="wrap" data-screen-label={`${String(idx + 1).padStart(2, '0')} ${r.code}`}>
      <div className="eyebrow">{r.code}:2026 · {r.rank}</div>
      <h1 className="r-title">{r.title[0]}{r.title[0].endsWith('n') && r.title[1].startsWith('f') ? '' : ' '}<span>{r.title[1]}</span></h1>
      <p className="r-one">{r.oneLiner}</p>

      <div className="r-grid">
        <div className="card"><div className="card-h">Was steckt dahinter?</div><p>{r.explain}</p></div>
        <div className="card analogy"><div className="card-h">Im Alltag erklärt</div><p>{r.analogy}</p></div>
      </div>

      <div className="sec-h">
        <div><div className="eyebrow">Live-Simulation</div><h2>Was passiert, wenn es passiert</h2></div>
        <div className="hint">Erst ungeschützt ansehen, dann mit Schutzmassnahmen wiederholen.</div>
      </div>
      <SimShell key={r.key} sim={sim} riskKey={r.key} onComplete={onComplete} />

      {unlocked ? (
        <div className="learn">
          <div className="card risk-l"><div className="card-h">Das kann passieren</div>
            <ul>{r.risks.map((x) => <li key={x}><span className="li-ic">!</span><span>{x}</span></li>)}</ul></div>
          <div className="card prot-l"><div className="card-h">So schützen Sie sich</div>
            <ul>{r.protect.map((x) => <li key={x}><span className="li-ic"><Icon name="check" size={12} /></span><span>{x}</span></li>)}</ul></div>
          <Quiz quiz={r.quiz} answer={state.quiz?.[r.key]} onAnswer={onAnswer} />
        </div>
      ) : (
        <div className="locked-note">Starten Sie die Simulation – danach erscheinen hier die wichtigsten Erkenntnisse und ein kurzer Check.</div>
      )}

      <div className="next-row">
        <button className="btn btn-ghost" onClick={() => go(idx - 1)}><Icon name="back" size={14} /> {idx === 0 ? 'Übersicht' : RISKS[idx - 1].code}</button>
        <button className="btn btn-primary" onClick={() => go(idx + 1)}>
          {idx === 9 ? 'Zum Finale: Der Ernstfall' : `Weiter zu ${RISKS[idx + 1].code}`} <Icon name="arrow" size={14} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [state, setState] = useState(() => ({ page: -1, sims: {}, quiz: {}, ...loadState() }));
  const mainRef = useRef(null);
  const update = (fn) => setState((s) => fn(s));
  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }, [state]);
  const go = (p) => { setState((s) => ({ ...s, page: Math.max(-1, Math.min(10, p)) })); if (mainRef.current) mainRef.current.scrollTop = 0; };

  const doneCount = RISKS.filter((r) => state.sims?.[r.key]?.unsafe || state.sims?.[r.key]?.safe).length;
  const page = state.page;

  if (page === 10) {
    return <Finale state={state} update={update} exit={() => go(9)} restart={() => { setState({ page: -1, sims: {}, quiz: {} }); }} />;
  }

  return (
    <div className="app">
      <nav className="side">
        <div className="brand">CAVORA PARTNERS</div>
        <div className="brand-sub">Sicherheit. Vertrauen. Produktivität.</div>
        <div className="brand-rule" />
        <button className={`nav-item ${page === -1 ? 'on' : ''}`} onClick={() => go(-1)} style={{ marginBottom: 14 }}>
          <span className="code">00</span><span>Übersicht</span><span />
        </button>
        <div className="side-eyebrow">OWASP LLM Top 10 · 2026</div>
        {RISKS.map((r, i) => {
          const d = state.sims?.[r.key]?.unsafe || state.sims?.[r.key]?.safe;
          return (
            <button key={r.code} className={`nav-item ${page === i ? 'on' : ''}`} onClick={() => go(i)}>
              <span className="code">{r.code}</span><span>{r.title.join(r.code === 'LLM07' ? '' : ' ')}</span>
              <span className={`st ${d ? 'done' : ''}`}>{d && <Icon name="check" size={10} />}</span>
            </button>
          );
        })}
        <button className="nav-item finale" onClick={() => go(10)}>
          <span className="code">★</span><span>Finale: Der Ernstfall</span><span />
        </button>
        <div className="side-prog">
          <div className="side-prog-l"><span>Fortschritt</span><span>{doneCount} / 10</span></div>
          <div className="side-prog-t"><div className="side-prog-f" style={{ width: doneCount * 10 + '%' }} /></div>
        </div>
      </nav>
      <main className="main" ref={mainRef}>
        {page === -1 ? <Intro go={go} /> : <RiskPage idx={page} state={state} update={update} go={go} />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
