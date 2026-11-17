import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { buildDeck, type Question } from "./data/questions";
import {
  startMusic,
  stopMusic,
  setMuted,
  playCorrect,
  playWrong,
  playTick,
  playFanfare,
} from "./audio";
import "./App.css";

type Phase = "inicio" | "jugando" | "final";
type Turno = "normal" | "rebote" | "resuelto";

const LETTERS = ["A", "B", "C", "D"];
const OPTION_COLORS = ["#ff5e78", "#3b82f6", "#f59e0b", "#22c55e"];
const CATEGORY_EMOJI: Record<string, string> = {
  Ciencia: "🔬",
  Arte: "🎨",
  Historia: "🏛️",
};

function fireConfetti() {
  const colors = ["#ff0080", "#ffcc00", "#00e5ff", "#7c3aed", "#22c55e"];
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors });
  setTimeout(
    () =>
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
      }),
    200,
  );
  setTimeout(
    () =>
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      }),
    350,
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>("inicio");
  const [nameA, setNameA] = useState("Equipo A");
  const [nameB, setNameB] = useState("Equipo B");
  const [deck, setDeck] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [turno, setTurno] = useState<Turno>("normal");
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [muted, setMutedState] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [lastResult, setLastResult] = useState<null | {
    ok: boolean;
    points: number;
    team: 0 | 1;
    rebound: boolean;
  }>(null);
  const timerRef = useRef<number | null>(null);

  const q = deck[index];
  // Turnos alternos: pregunta 1 → A, 2 → B, 3 → A...
  const activeTeam: 0 | 1 = index % 2 === 0 ? 0 : 1;
  const answeringTeam: 0 | 1 = turno === "rebote" ? (activeTeam === 0 ? 1 : 0) : activeTeam;
  const teamName = answeringTeam === 0 ? nameA : nameB;
  const activeName = activeTeam === 0 ? nameA : nameB;

  const stopTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTimeout = () => {
    if (turno === "normal") {
      playWrong();
      setTurno("rebote");
      setTimeLeft(30);
      setSelected(null);
    } else {
      // Se acabó el rebote sin acierto: se muestra la correcta
      setTurno("resuelto");
      setLastResult({ ok: false, points: 0, team: answeringTeam, rebound: true });
    }
  };

  // Temporizador principal
  useEffect(() => {
    if (phase !== "jugando" || turno === "resuelto" || !q) return;
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          handleTimeout();
          return 0;
        }
        if (t <= 6) playTick();
        return t - 1;
      });
    }, 1000);
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turno, index, q]);

  // Fanfarria al llegar a la pantalla final
  useEffect(() => {
    if (phase === "final") playFanfare();
  }, [phase]);

  const startGame = () => {
    setDeck(buildDeck());
    setIndex(0);
    setScoreA(0);
    setScoreB(0);
    setTurno("normal");
    setSelected(null);
    setTimeLeft(60);
    setLastResult(null);
    setImgError(false);
    setPhase("jugando");
    startMusic();
  };

  const choose = (i: number) => {
    if (turno === "resuelto" || selected !== null || !q) return;
    setSelected(i);
    if (i === q.correct) {
      const points = turno === "rebote" ? 75 : 50;
      if (answeringTeam === 0) setScoreA((s) => s + points);
      else setScoreB((s) => s + points);
      playCorrect();
      fireConfetti();
      stopTimer();
      setTurno("resuelto");
      setLastResult({ ok: true, points, team: answeringTeam, rebound: turno === "rebote" });
    } else if (turno === "normal") {
      playWrong();
      // Fallo inicial → rebote para el otro equipo
      setTimeout(() => {
        setSelected(null);
        setTurno("rebote");
        setTimeLeft(30);
      }, 1400);
    } else {
      playWrong();
      stopTimer();
      setTurno("resuelto");
      setLastResult({ ok: false, points: 0, team: answeringTeam, rebound: true });
    }
  };

  const nextQuestion = () => {
    setImgError(false);
    setSelected(null);
    setLastResult(null);
    if (index + 1 >= deck.length) {
      stopTimer();
      setPhase("final");
    } else {
      setIndex((i) => i + 1);
      setTurno("normal");
      setTimeLeft(60);
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const playAgain = () => {
    stopMusic();
    setPhase("inicio");
  };

  const total = scoreA + scoreB;
  const pctA = total === 0 ? 50 : Math.round((scoreA / total) * 100);
  const leader = scoreA > scoreB ? nameA : scoreB > scoreA ? nameB : null;

  return (
    <div className="app">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />

      <button
        className="mute-btn"
        onClick={toggleMute}
        aria-label={muted ? "Activar música" : "Silenciar música"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {phase === "inicio" && (
        <main className="screen start-screen">
          <div className="logo-badge">🎓🏆</div>
          <h1 className="title">
            <span className="title-line">¿QUIÉN QUIERE</span>
            <span className="title-line title-ser">SER</span>
            <span className="title-line title-func">FUNCIONARIO!!</span>
          </h1>
          <p className="subtitle">
            💥 El concurso de cultura general más difícil 💥
            <br />
            20 preguntas · Ciencia, Arte e Historia · ¡A por la plaza!
          </p>

          <div className="teams-setup">
            <label className="team-input team-a-input">
              <span className="team-emoji">🔴</span> Equipo A
              <input
                value={nameA}
                maxLength={20}
                onChange={(e) => setNameA(e.target.value || "Equipo A")}
                placeholder="Equipo A"
              />
            </label>
            <span className="vs-big">⚔️</span>
            <label className="team-input team-b-input">
              <span className="team-emoji">🔵</span> Equipo B
              <input
                value={nameB}
                maxLength={20}
                onChange={(e) => setNameB(e.target.value || "Equipo B")}
                placeholder="Equipo B"
              />
            </label>
          </div>

          <button className="btn-start" onClick={startGame}>
            ▶️ ¡EMPEZAR LA PARTIDA!
          </button>

          <div className="rules">
            <div className="rule">⏱️ <strong>60 s</strong> por pregunta</div>
            <div className="rule">🔁 <strong>30 s</strong> de rebote si fallan</div>
            <div className="rule">✅ Acierto: <strong>50 puntos</strong></div>
            <div className="rule">🎯 Rebote: <strong>75 puntos</strong></div>
          </div>
          <p className="hint">🎵 La música de concurso sonará al empezar. Pulsa el altavoz para silenciarla.</p>
        </main>
      )}

      {phase === "jugando" && q && (
        <main className="screen game-screen">
          <header className="scoreboard">
            <div className={`score-card score-a ${activeTeam === 0 ? "active" : ""}`}>
              <span className="score-team">{nameA}</span>
              <span className="score-points">{scoreA}</span>
              <span className="score-label">puntos</span>
            </div>
            <div className="score-middle">
              <span className="question-counter">
                Pregunta {index + 1} <span className="of">/ {deck.length}</span>
              </span>
              <div className="score-bars">
                <div
                  className="bar bar-a"
                  style={{ width: `${pctA}%` }}
                  title={`${nameA}: ${scoreA}`}
                />
                <div
                  className="bar bar-b"
                  style={{ width: `${100 - pctA}%` }}
                  title={`${nameB}: ${scoreB}`}
                />
              </div>
              <span className="leader">
                {leader ? `👑 Va ganando: ${leader}` : "🤝 ¡Empate!"}
              </span>
            </div>
            <div className={`score-card score-b ${activeTeam === 1 ? "active" : ""}`}>
              <span className="score-team">{nameB}</span>
              <span className="score-points">{scoreB}</span>
              <span className="score-label">puntos</span>
            </div>
          </header>

          <div className="turn-banner">
            {turno === "rebote" ? (
              <>
                🔁 <strong>¡REBOTE!</strong> Ahora responde{" "}
                <span className="turn-team">{teamName}</span> · 30 segundos
              </>
            ) : (
              <>
                🎯 <strong>TURNO: {activeName.toUpperCase()}</strong>
              </>
            )}
          </div>

          <section className="question-card" key={`${index}-${turno}`}>
            <div className="q-top">
              <span className="category-badge">
                {CATEGORY_EMOJI[q.category]} {q.category}
              </span>
              <div
                className={`timer ${timeLeft <= 10 ? "danger" : ""} ${
                  turno === "resuelto" ? "paused" : ""
                }`}
              >
                <svg viewBox="0 0 100 100" className="timer-ring">
                  <circle cx="50" cy="50" r="44" className="ring-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="ring-fg"
                    strokeDasharray="276.5"
                    strokeDashoffset={
                      276.5 * (1 - timeLeft / (turno === "rebote" ? 30 : 60))
                    }
                  />
                </svg>
                <span className="timer-num">{timeLeft}s</span>
              </div>
            </div>

            <div className="q-image-wrap">
              {imgError ? (
                <div className="q-image-fallback">
                  <span>{q.emoji}</span>
                </div>
              ) : (
                <img
                  src={q.image}
                  alt={`Imagen de la pregunta ${index + 1}`}
                  className="q-image"
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              )}
            </div>

            <h2 className="question-text">{q.question}</h2>

            <div className="options">
              {q.options.map((opt, i) => {
                let cls = "option";
                if (selected !== null) {
                  if (i === q.correct) cls += " correct";
                  else if (i === selected) cls += " wrong";
                  else cls += " dimmed";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    style={{ "--opt-color": OPTION_COLORS[i] } as React.CSSProperties}
                    onClick={() => choose(i)}
                    disabled={turno === "resuelto" || selected !== null}
                  >
                    <span className="opt-letter">{LETTERS[i]}</span>
                    <span className="opt-text">{opt}</span>
                    {selected !== null && i === q.correct && (
                      <span className="opt-mark">✅</span>
                    )}
                    {selected !== null && i === selected && i !== q.correct && (
                      <span className="opt-mark">❌</span>
                    )}
                  </button>
                );
              })}
            </div>

            {turno === "resuelto" && lastResult && (
              <div
                className={`result-box ${lastResult.ok ? "result-ok" : "result-ko"}`}
              >
                {lastResult.ok ? (
                  <>
                    <span className="result-emoji">🎉</span>
                    <strong>
                      ¡Correcto! +{lastResult.points} puntos para{" "}
                      {lastResult.team === 0 ? nameA : nameB}
                    </strong>
                    {lastResult.rebound && <span> (¡rebote acertado!)</span>}
                  </>
                ) : (
                  <>
                    <span className="result-emoji">😢</span>
                    <strong>¡Nadie acertó!</strong>
                    <span>
                      {" "}
                      La respuesta correcta era: <strong>{q.options[q.correct]}</strong>
                    </span>
                  </>
                )}
                <p className="explanation">💡 {q.explanation}</p>
                <button className="btn-next" onClick={nextQuestion}>
                  {index + 1 >= deck.length
                    ? "🏁 ¡VER EL RESULTADO FINAL!"
                    : "➡️ Siguiente pregunta"}
                </button>
              </div>
            )}

            {turno === "normal" && selected !== null && (
              <div className="rebound-notice">
                ❌ ¡Fallo! El rebote pasa al otro equipo… 🔁
              </div>
            )}
          </section>
        </main>
      )}

      {phase === "final" && (
        <main className="screen final-screen">
          <div className="trophy">🏆</div>
          <h1 className="final-title">¡FIN DE LA PARTIDA!</h1>
          {scoreA === scoreB ? (
            <p className="winner-text">🤝 ¡EMPATE! ¡Qué partidaza!</p>
          ) : (
            <p className="winner-text">
              🎉 ¡{scoreA > scoreB ? nameA : nameB} GANA LA PARTIDA! 🎉
            </p>
          )}
          <div className="final-scores">
            <div className={`final-card ${scoreA >= scoreB ? "champion" : ""}`}>
              <span className="final-team">{nameA}</span>
              <span className="final-points">{scoreA}</span>
              <span className="final-label">puntos</span>
              {scoreA > scoreB && <span className="crown">👑 ¡GANADOR!</span>}
            </div>
            <span className="final-vs">⚔️</span>
            <div className={`final-card ${scoreB >= scoreA ? "champion" : ""}`}>
              <span className="final-team">{nameB}</span>
              <span className="final-points">{scoreB}</span>
              <span className="final-label">puntos</span>
              {scoreB > scoreA && <span className="crown">👑 ¡GANADOR!</span>}
            </div>
          </div>
          <p className="final-note">
            📚 20 preguntas de Ciencia, Arte e Historia superadas.
            <br />
            ¡La plaza de funcionario está cada vez más cerca! 💼✨
          </p>
          <button className="btn-start" onClick={playAgain}>
            🔄 ¡JUGAR DE NUEVO!
          </button>
        </main>
      )}
    </div>
  );
}
