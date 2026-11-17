/**
 * Música de fondo y efectos generados con Web Audio API.
 * No usa ningún archivo externo: todo se sintetiza en el navegador.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let timerId: number | null = null;
let muted = false;
let started = false;

// Melodía alegre tipo concurso (en Do mayor), en bucles de 8 compases.
// Cada nota: [midi, duración en pasos de semicorchea]
const MELODY: Array<[number, number]> = [
  [72, 2], [76, 2], [79, 2], [76, 2], [81, 4], [79, 2], [76, 2],
  [74, 2], [76, 2], [77, 4], [76, 2], [74, 2], [72, 4], [0, 2],
  [72, 2], [76, 2], [79, 2], [76, 2], [84, 4], [81, 2], [79, 2],
  [77, 2], [79, 2], [76, 4], [74, 2], [72, 2], [67, 4], [0, 2],
];
// Acordes de acompañamiento (notas midi) por compás
const CHORDS: number[][] = [
  [48, 55, 60, 64],
  [53, 57, 60, 65],
  [45, 52, 57, 60],
  [48, 55, 59, 62],
];

const STEP = 0.16; // segundos por semicorchea (~94 BPM)

function midiToFreq(m: number): number {
  return 440 * Math.pow(2, (m - 69) / 12);
}

function ensureCtx(): AudioContext {
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    musicGain = ctx.createGain();
    musicGain.gain.value = muted ? 0 : 0.5;
    musicGain.connect(master);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function playTone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  vol: number,
  dest: GainNode | null,
) {
  if (!ctx || !dest) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(vol, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function scheduleLoop() {
  if (!ctx || !musicGain) return;
  const now = ctx.currentTime + 0.1;
  const barLen = 16 * STEP; // 16 semicorcheas por compás
  const totalLen = 4 * barLen;

  // Melodía
  let t = now;
  for (const [note, steps] of MELODY) {
    const dur = steps * STEP;
    if (note > 0) playTone(midiToFreq(note), t, dur * 0.95, "triangle", 0.22, musicGain);
    t += dur;
  }
  // Segunda vuelta de la melodía una octava más baja en el segundo ciclo no:
  // en su lugar, acordes de fondo por compás
  CHORDS.forEach((chord, bar) => {
    const start = now + bar * barLen;
    chord.forEach((n) => {
      playTone(midiToFreq(n), start, barLen * 0.9, "sine", 0.05, musicGain);
    });
  });
  // Bombo suave en cada tiempo
  for (let i = 0; i < 16; i++) {
    const start = now + i * STEP * 2;
    playTone(90, start, 0.12, "sine", 0.12, musicGain);
  }

  timerId = window.setTimeout(scheduleLoop, totalLen * 1000);
}

export function startMusic() {
  ensureCtx();
  if (started) return;
  started = true;
  scheduleLoop();
}

export function stopMusic() {
  if (timerId !== null) {
    window.clearTimeout(timerId);
    timerId = null;
  }
  started = false;
}

export function setMuted(m: boolean) {
  muted = m;
  if (musicGain && ctx) {
    musicGain.gain.setTargetAtTime(m ? 0 : 0.5, ctx.currentTime, 0.05);
  }
}

export function isMuted(): boolean {
  return muted;
}

/** Efecto de acierto: arpegio ascendente alegre. */
export function playCorrect() {
  ensureCtx();
  if (!ctx || !master) return;
  const now = ctx.currentTime + 0.02;
  [72, 76, 79, 84].forEach((n, i) => {
    playTone(midiToFreq(n), now + i * 0.09, 0.35, "triangle", 0.3, master);
  });
  playTone(midiToFreq(88), now + 0.4, 0.6, "sine", 0.2, master);
}

/** Efecto de fallo: dos notas descendentes. */
export function playWrong() {
  ensureCtx();
  if (!ctx || !master) return;
  const now = ctx.currentTime + 0.02;
  [62, 58].forEach((n, i) => {
    playTone(midiToFreq(n), now + i * 0.22, 0.4, "sawtooth", 0.12, master);
  });
}

/** Tick de los últimos 5 segundos. */
export function playTick() {
  ensureCtx();
  if (!ctx || !master) return;
  playTone(1200, ctx.currentTime, 0.06, "square", 0.06, master);
}

/** Fanfarria de ganador. */
export function playFanfare() {
  ensureCtx();
  if (!ctx || !master) return;
  const now = ctx.currentTime + 0.02;
  const seq: Array<[number, number]> = [
    [72, 0], [72, 0.15], [72, 0.3], [79, 0.45], [84, 0.7], [79, 0.9], [84, 1.1],
  ];
  seq.forEach(([n, d]) => {
    playTone(midiToFreq(n), now + d, 0.4, "triangle", 0.28, master);
    playTone(midiToFreq(n - 12), now + d, 0.4, "sine", 0.1, master);
  });
}
