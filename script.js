// Morse mapping
const MORSE = {
  'A': '.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_':'..--.-','"':'.-..-.','@':'.--.-.'
};
const TEXT_FROM_MORSE = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

// DOM
const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const convertBtn = document.getElementById('convert');
const clearBtn = document.getElementById('clear');
const copyOutBtn = document.getElementById('copy-out');
const modeSel = document.getElementById('mode');
const swapBtn = document.getElementById('swap');
const playBtn = document.getElementById('play');
const examples = document.querySelectorAll('.example');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

function normalizeInput(s){
  return s.replace(/\u00A0/g,' ').trim();
}

function looksLikeMorse(s){
  if(!s) return false;
  // count dots/dashes vs letters
  const morseChars = (s.match(/[.-]/g)||[]).length;
  const alpha = (s.match(/[A-Za-z0-9]/g)||[]).length;
  // if more morse symbols than letters, treat as morse
  if(morseChars > alpha) return true;
  // also if contains long sequences of dots/dashes or slashes
  if(/[\.\-]{3,}/.test(s) || /\//.test(s)) return true;
  return false;
}

function encodeTextToMorse(text){
  // split words, map characters, join with spaces
  return text.toUpperCase().split(/\s+/).map(word=>{
    return word.split('').map(ch=>MORSE[ch]||'').filter(Boolean).join(' ');
  }).join(' / ');
}

function decodeMorseToText(morse){
  // allow / or 3+ spaces as word separator
  const words = morse.trim().split(/\s{3,}|\s?\/\s?/);
  return words.map(w=>{
    return w.trim().split(/\s+/).map(sym=>TEXT_FROM_MORSE[sym]||'').join('');
  }).join(' ');
}

function convert(){
  const raw = normalizeInput(inputEl.value);
  const forced = modeSel.value;
  if(!raw) { outputEl.value = ''; return; }
  let out = '';
  if(forced === 'encode') out = encodeTextToMorse(raw);
  else if(forced === 'decode') out = decodeMorseToText(raw);
  else {
    if(looksLikeMorse(raw)) out = decodeMorseToText(raw);
    else out = encodeTextToMorse(raw);
  }
  outputEl.value = out;
}

convertBtn.addEventListener('click', convert);
clearBtn.addEventListener('click', ()=>{ inputEl.value=''; outputEl.value=''; });
copyOutBtn.addEventListener('click', async ()=>{
  try{ await navigator.clipboard.writeText(outputEl.value); copyOutBtn.textContent='Copied!'; setTimeout(()=>copyOutBtn.textContent='Copy Output',1200);}catch(e){alert('Copy failed');}
});

swapBtn.addEventListener('click', ()=>{
  const a = inputEl.value; const b = outputEl.value; inputEl.value=b; outputEl.value=a;
});

examples.forEach(btn=>btn.addEventListener('click', ()=>{ inputEl.value = btn.textContent; convert(); }));

// Play Morse with WebAudio
playBtn.addEventListener('click', ()=>{
  const morse = outputEl.value || inputEl.value;
  if(!morse) return;
  // ensure we have morse: if looks like text, convert first
  let playMorse = morse;
  if(!looksLikeMorse(morse)) playMorse = encodeTextToMorse(morse);
  playMorseAudio(playMorse);
});

function playMorseAudio(morse){
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const dotTime = 0.12; // seconds for dot
  const dashTime = dotTime*3;
  const freq = 700;
  let t = ctx.currentTime;
  function tone(duration){
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = freq; o.type='sine';
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.7,t+0.002);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+duration);
    g.gain.exponentialRampToValueAtTime(0.0001,t+duration);
    t += duration + dotTime; // gap between symbols
  }
  // parse
  morse.trim().split('').forEach(ch=>{
    if(ch === '.') tone(dotTime);
    else if(ch === '-') tone(dashTime);
    else if(ch === ' ') t += dotTime*2; // between letters
    else if(ch === '/') t += dotTime*4; // between words
  });
}

// keyboard: Ctrl+Enter to convert
inputEl.addEventListener('keydown', (e)=>{ if(e.ctrlKey && e.key==='Enter'){ convert(); } });

// auto-convert on paste or input when mode=auto
inputEl.addEventListener('input', ()=>{ if(modeSel.value==='auto') convert(); });
modeSel.addEventListener('change', ()=>{ if(modeSel.value==='auto') convert(); });

// export for testing (node or console)
if(typeof window !== 'undefined'){
  window._morse = {encodeTextToMorse, decodeMorseToText, looksLikeMorse};
}
