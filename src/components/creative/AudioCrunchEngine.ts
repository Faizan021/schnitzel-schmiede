// Web Audio API Synthesizer for tactile crispy crunch & sizzling butter sounds
// 100% synthetic, zero network latency, zero audio assets needed

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a crispy schnitzel bite crunch sound
 */
export function playCrunchSound(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.18; // 180ms burst
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate crackle burst noise
  for (let i = 0; i < bufferSize; i++) {
    const envelope = Math.exp(-i / (ctx.sampleRate * 0.04));
    data[i] = (Math.random() * 2 - 1) * envelope * (Math.random() > 0.3 ? 1 : 0.2);
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2800, now);
  filter.Q.setValueAtTime(3.5, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

  noiseNode.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseNode.start(now);
}

/**
 * Plays hot sizzling pan butter sound for hover states
 */
export function playSizzleSound(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.35;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    const env = Math.sin(t * Math.PI);
    // Bubble sizzle randomness
    const crackle = Math.random() > 0.85 ? Math.random() * 1.5 : 0.2;
    data[i] = (Math.random() * 2 - 1) * env * crackle * 0.12;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3800, now);
  filter.Q.setValueAtTime(1.8, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.35);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
}

/**
 * Simulates active clarified butter frying in a hot skillet for 2.5 seconds
 */
export function playSkilletSizzleSimulation(durationMs = 2500): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const durSec = durationMs / 1000;
  const bufferSize = Math.floor(ctx.sampleRate * durSec);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate bubbling hot butter fat crackle
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown noise approximation for deep sizzling mass
    lastOut = (lastOut + 0.02 * white) / 1.02;
    // High crackle pops
    const pop = Math.random() > 0.96 ? (Math.random() - 0.5) * 1.8 : 0;
    data[i] = (lastOut * 0.7 + white * 0.3 + pop) * 0.18;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(2600, now);
  bandpass.Q.setValueAtTime(1.2, now);

  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.setValueAtTime(800, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
  gain.gain.setValueAtTime(0.18, now + durSec - 0.4);
  gain.gain.linearRampToValueAtTime(0.001, now + durSec);

  noise.connect(highpass);
  highpass.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
}
