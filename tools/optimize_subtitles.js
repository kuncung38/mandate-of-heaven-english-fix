const fs = require('fs');
const path = require('path');

function parseTimestamp(ts) {
  const parts = ts.trim().split(':');
  if (parts.length === 2) {
    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
  } else if (parts.length === 3) {
    return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
  }
  return 0;
}

function formatTimestamp(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.round((sec - Math.floor(sec)) * 1000);
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  const mms = String(ms).padStart(3, '0');
  if (h > 0) {
    const hh = String(h).padStart(2, '0');
    return `${hh}:${mm}:${ss}.${mms}`;
  }
  return `${mm}:${ss}.${mms}`;
}

function processVttFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  const cues = [];
  let header = [];
  let readingHeader = true;
  let currentStart = null;
  let currentEnd = null;
  let currentSettings = '';
  let currentText = [];
  let cueIdentifier = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (readingHeader) {
      if (line.includes('-->')) {
        readingHeader = false;
      } else {
        header.push(line);
        continue;
      }
    }

    if (line.includes('-->')) {
      const parts = line.split('-->');
      currentStart = parts[0].trim();
      const endAndSettings = parts[1].trim().split(/\s+(.+)/);
      currentEnd = endAndSettings[0].trim();
      currentSettings = endAndSettings[1] || '';
      currentText = [];
    } else if (line.trim() === '') {
      if (currentStart && currentEnd && currentText.length > 0) {
        cues.push({
          id: cueIdentifier,
          start: currentStart,
          end: currentEnd,
          startSec: parseTimestamp(currentStart),
          endSec: parseTimestamp(currentEnd),
          settings: currentSettings,
          text: currentText.join('\n')
        });
        cueIdentifier = null;
        currentStart = null;
        currentEnd = null;
        currentSettings = '';
        currentText = [];
      }
    } else {
      if (!currentStart) {
        cueIdentifier = line;
      } else {
        currentText.push(line);
      }
    }
  }

  if (currentStart && currentEnd && currentText.length > 0) {
    cues.push({
      id: cueIdentifier,
      start: currentStart,
      end: currentEnd,
      startSec: parseTimestamp(currentStart),
      endSec: parseTimestamp(currentEnd),
      settings: currentSettings,
      text: currentText.join('\n')
    });
  }

  if (cues.length === 0) return { modified: 0, total: 0 };

  let modifiedCount = 0;

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    const duration = cue.endSec - cue.startSec;
    const words = cue.text.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
    const wps = words / Math.max(0.1, duration);

    // If subtitle is fast or short
    if (wps > 3.2 || duration < 1.4) {
      let maxAllowedEnd;
      if (i < cues.length - 1) {
        const nextCue = cues[i + 1];
        // Leave at least 80ms silence gap before next dialogue
        maxAllowedEnd = nextCue.startSec - 0.08;
      } else {
        maxAllowedEnd = cue.endSec + 0.6;
      }

      if (maxAllowedEnd > cue.endSec + 0.1) {
        const targetDuration = Math.max(1.4, words / 3.0);
        const desiredEnd = cue.startSec + targetDuration;
        const newEndSec = Math.min(desiredEnd, maxAllowedEnd);

        if (newEndSec > cue.endSec + 0.05) {
          cue.endSec = Math.round(newEndSec * 1000) / 1000;
          cue.end = formatTimestamp(cue.endSec);
          modifiedCount++;
        }
      }
    }
  }

  // Verification: ensure zero overlap
  for (let i = 0; i < cues.length - 1; i++) {
    if (cues[i].endSec > cues[i + 1].startSec - 0.05) {
      cues[i].endSec = cues[i + 1].startSec - 0.08;
      cues[i].end = formatTimestamp(cues[i].endSec);
    }
  }

  if (modifiedCount > 0) {
    let out = header.join('\n').trim() + '\n\n';
    for (const cue of cues) {
      if (cue.id) out += cue.id + '\n';
      const settingsStr = cue.settings ? ' ' + cue.settings : '';
      out += `${cue.start} --> ${cue.end}${settingsStr}\n`;
      out += `${cue.text}\n\n`;
    }
    fs.writeFileSync(filePath, out, 'utf8');
  }

  return { modified: modifiedCount, total: cues.length };
}

const baseDir = 'C:/Users/user/.gemini/antigravity/brain/6c8f5a3f-e067-49b5-bfab-092c166fce3c/scratch/subtitles';
let grandModified = 0;
let grandTotal = 0;
let grandFiles = 0;

for (let chap = 0; chap <= 7; chap++) {
  const chapDir = path.join(baseDir, `chapter${chap}/subtitles`);
  if (!fs.existsSync(chapDir)) continue;
  const files = fs.readdirSync(chapDir).filter(f => f.endsWith('.vtt'));
  let chapMod = 0;
  let chapTotal = 0;
  for (const f of files) {
    const res = processVttFile(path.join(chapDir, f));
    chapMod += res.modified;
    chapTotal += res.total;
  }
  console.log(`Chapter ${chap}: optimized ${chapMod} of ${chapTotal} cues across ${files.length} files.`);
  grandModified += chapMod;
  grandTotal += chapTotal;
  grandFiles += files.length;
}

console.log(`\nALL DONE: Optimized ${grandModified} of ${grandTotal} cues across ${grandFiles} files without touching next dialogue.`);
