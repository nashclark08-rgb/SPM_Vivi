/* PTI Shared Sound Library — Web Audio API synthesis, no external files required */

const PTI_SOUNDS = {

  /* ── END OF INTERVIEW SOUNDS ─────────────────────────────────── */

  triple_chime: {
    label: 'Triple Chime',
    play(ctx) {
      [[880,0],[660,0.42],[440,0.84]].forEach(([f,t]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.55, ctx.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+t+0.65);
        o.start(ctx.currentTime+t); o.stop(ctx.currentTime+t+0.68);
      });
    }
  },

  classic_bell: {
    label: 'Classic Bell',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(880, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime+1.8);
      g.gain.setValueAtTime(0.7, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+2);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+2.1);
    }
  },

  school_bell: {
    label: 'School Bell',
    play(ctx) {
      for (let i=0;i<8;i++) {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.value = 820 + (i%2)*60;
        g.gain.setValueAtTime(0.4, ctx.currentTime+i*0.11);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+i*0.11+0.09);
        o.start(ctx.currentTime+i*0.11); o.stop(ctx.currentTime+i*0.11+0.11);
      }
    }
  },

  soft_gong: {
    label: 'Soft Gong',
    play(ctx) {
      [[200,1,2.5],[400,0.3,1.5],[600,0.15,0.8]].forEach(([f,a,d]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(a, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+d);
        o.start(ctx.currentTime); o.stop(ctx.currentTime+d+0.1);
      });
    }
  },

  two_tone_bell: {
    label: 'Two-Tone Bell',
    play(ctx) {
      [[660,0],[520,0.38]].forEach(([f,t]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.6, ctx.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+t+0.9);
        o.start(ctx.currentTime+t); o.stop(ctx.currentTime+t+0.95);
      });
    }
  },

  piano_chord: {
    label: 'Piano Chord',
    play(ctx) {
      [261.6, 329.6, 392, 523.3].forEach((f,i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.28, ctx.currentTime+i*0.04);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+1.4);
        o.start(ctx.currentTime+i*0.04); o.stop(ctx.currentTime+1.45);
      });
    }
  },

  notification: {
    label: 'Notification Ding',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(1047, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(784, ctx.currentTime+0.35);
      g.gain.setValueAtTime(0.5, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.4);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+0.45);
    }
  },

  doorbell: {
    label: 'Doorbell',
    play(ctx) {
      [[784,0],[523,0.42]].forEach(([f,t]) => {
        [1,2].forEach(mult => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.type = 'sine'; o.frequency.value = f*mult;
          g.gain.setValueAtTime(mult===1?0.5:0.12, ctx.currentTime+t);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+t+(mult===1?0.6:0.3));
          o.start(ctx.currentTime+t); o.stop(ctx.currentTime+t+(mult===1?0.65:0.35));
        });
      });
    }
  },

  buzzer: {
    label: 'Buzzer',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sawtooth'; o.frequency.value = 140;
      g.gain.setValueAtTime(0.3, ctx.currentTime);
      g.gain.setValueAtTime(0.3, ctx.currentTime+0.45);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.55);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+0.6);
    }
  },

  whistle: {
    label: 'Whistle',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      [0,0.15,0.3].forEach(t => o.frequency.setValueAtTime(t%0.3===0?2100:1800, ctx.currentTime+t));
      g.gain.setValueAtTime(0.32, ctx.currentTime);
      g.gain.setValueAtTime(0.32, ctx.currentTime+0.38);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.5);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+0.55);
    }
  },

  /* ── END OF BREAK SOUNDS ─────────────────────────────────────── */

  double_beep: {
    label: 'Double Beep',
    play(ctx) {
      [[440,0],[660,0.18],[440,0.55],[880,0.73]].forEach(([f,t]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'square'; o.frequency.value = f;
        g.gain.setValueAtTime(0.18, ctx.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+t+0.14);
        o.start(ctx.currentTime+t); o.stop(ctx.currentTime+t+0.16);
      });
    }
  },

  three_beeps: {
    label: 'Three Beeps',
    play(ctx) {
      [440,660,880].forEach((f,i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'square'; o.frequency.value = f;
        g.gain.setValueAtTime(0.2, ctx.currentTime+i*0.22);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+i*0.22+0.15);
        o.start(ctx.currentTime+i*0.22); o.stop(ctx.currentTime+i*0.22+0.18);
      });
    }
  },

  rising_tone: {
    label: 'Rising Tone',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(280, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime+0.65);
      g.gain.setValueAtTime(0.4, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.75);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+0.8);
    }
  },

  fanfare: {
    label: 'Fanfare',
    play(ctx) {
      [392,523,659,784].forEach((f,i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.35, ctx.currentTime+i*0.13);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+i*0.13+0.28);
        o.start(ctx.currentTime+i*0.13); o.stop(ctx.currentTime+i*0.13+0.3);
      });
    }
  },

  ascending_chime: {
    label: 'Ascending Chime',
    play(ctx) {
      [440,554,659,880].forEach((f,i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.4, ctx.currentTime+i*0.28);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+i*0.28+0.55);
        o.start(ctx.currentTime+i*0.28); o.stop(ctx.currentTime+i*0.28+0.6);
      });
    }
  },

  air_horn: {
    label: 'Air Horn',
    play(ctx) {
      [220,330,440].forEach(f => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sawtooth'; o.frequency.value = f;
        g.gain.setValueAtTime(0.15, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.6);
        o.start(ctx.currentTime); o.stop(ctx.currentTime+0.65);
      });
    }
  },

  alert_tone: {
    label: 'Alert Tone',
    play(ctx) {
      [0,0.15,0.3,0.45].forEach(t => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'square'; o.frequency.value = 1000;
        g.gain.setValueAtTime(0.2, ctx.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+t+0.1);
        o.start(ctx.currentTime+t); o.stop(ctx.currentTime+t+0.12);
      });
    }
  },

  start_bell: {
    label: 'Starting Bell',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      [[0,440],[0.08,660],[0.16,880]].forEach(([t,f]) => o.frequency.setValueAtTime(f, ctx.currentTime+t));
      g.gain.setValueAtTime(0.55, ctx.currentTime);
      g.gain.setValueAtTime(0.55, ctx.currentTime+0.4);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+1.1);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+1.15);
    }
  },

  electronic: {
    label: 'Electronic Arpeggio',
    play(ctx) {
      [262,330,392,523,659].forEach((f,i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'square'; o.frequency.value = f;
        g.gain.setValueAtTime(0.14, ctx.currentTime+i*0.09);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+i*0.09+0.08);
        o.start(ctx.currentTime+i*0.09); o.stop(ctx.currentTime+i*0.09+0.1);
      });
    }
  },

  soft_sweep: {
    label: 'Soft Sweep',
    play(ctx) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(200, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(700, ctx.currentTime+0.45);
      g.gain.linearRampToValueAtTime(0.42, ctx.currentTime+0.08);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.6);
      o.start(ctx.currentTime); o.stop(ctx.currentTime+0.65);
    }
  },

};

/* Plays a sound by ID using the Web Audio API */
function ptiPlaySound(id) {
  try {
    const sound = PTI_SOUNDS[id];
    if (!sound) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    sound.play(ctx);
  } catch(e) { console.warn('PTI Sound error:', e); }
}

/* End-of-interview sounds (first 10 keys) */
const PTI_INTERVIEW_END_SOUNDS = [
  'triple_chime','classic_bell','school_bell','soft_gong',
  'two_tone_bell','piano_chord','notification','doorbell','buzzer','whistle'
];

/* End-of-break sounds (last 10 keys) */
const PTI_BREAK_END_SOUNDS = [
  'double_beep','three_beeps','rising_tone','fanfare',
  'ascending_chime','air_horn','alert_tone','start_bell','electronic','soft_sweep'
];
