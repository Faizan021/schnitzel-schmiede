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
    // Envelope: quick attack, crunchy decay
    const envelope = Math.exp(-i / (ctx.sampleRate * 0.04));
    data[i] = (Math.random() * 2 - 1) * envelope * (Math.random() > 0.3 ? 1 : 0.2);
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  // Bandpass filter for crispy breadcrumb resonance (around 2200Hz - 4500Hz)
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
  const bufferSize = ctx.sampleRate * 0.25;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    const env = Math.sin(t * Math.PI);
    data[i] = (Math.random() * 2 - 1) * env * 0.15;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(4500, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.25);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
}
