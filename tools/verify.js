const fs = require('fs');
const asar = require('C:/Users/user/AppData/Local/npm-cache/_npx/8b3f11f22d4db0c9/node_modules/asar');

const archive = 'E:/SteamLibrary/steamapps/common/江山北望/resources/app.asar';
const navContent = asar.extractFile(archive, 'renderer\\main_window\\assets\\navigation-DQdXAQm4.js').toString('utf8');
const indexContent = asar.extractFile(archive, 'renderer\\main_window\\assets\\index-wQ5G7oRV.js').toString('utf8');
const screenContent = asar.extractFile(archive, 'renderer\\main_window\\assets\\screen-sleep-CMg9xret.js').toString('utf8');
const cssContent = asar.extractFile(archive, 'renderer\\main_window\\assets\\index-BMJsZ6tx.css').toString('utf8');

console.log('=== COMPREHENSIVE MOD VERIFICATION ===\n');

const checks = [
  ['Default locale is English (S=`en`)', navContent.includes('S=`en`')],
  ['English label localized_name:`English`', navContent.includes('localized_name:`English`')],
  ['Main menu New Game translated', navContent.includes('new_game:`New Game`')],
  ['Main menu Settings translated', navContent.includes('settings:`Settings`')],
  ['Main menu Continue Game translated', navContent.includes('continue_game:`Continue Game`')],
  ['Values dictionary translated (Military Morale)', navContent.includes('Military Morale')],
  ['createGame defaults to English', navContent.includes('createGame(e=`en`){')],
  ['Dynamic locale(e) in story engine (choice bug fix)', navContent.includes('this.content.locales[l]')],
  ['UI store fallback is English', indexContent.includes('r.value||await pr()||`en`')],
  ['Header fallback is English', indexContent.includes('t.api.getJsonHeaders().Locale||`en`')],
  ['Overlay At_en dictionary present', screenContent.includes('const At_en=')],
  ['Overlay character intro ke dynamic translation', screenContent.includes('m=At_en[e.videoId')],
  ['Overlay trust/morale Oe dynamic translation', screenContent.includes("Emperor's Trust")],
  ['QTE Tap button translated', screenContent.includes('pe.global.locale.value===`en`?`Tap`:`点击`')],
  ['QTE Hold button translated', screenContent.includes('pe.global.locale.value===`en`?`Hold`:`长按`')],
  ['High contrast subtitle CSS styling applied', cssContent.includes('Enhanced Subtitle Readability for English')]
];

let passed = 0;
for (const [desc, result] of checks) {
  console.log(`[${result ? 'PASS' : 'FAIL'}] ${desc}`);
  if (result) passed++;
}

console.log(`\nApp Engine Verification: ${passed} / ${checks.length} checks passed.`);

// Check subtitle packs
const gameDir = 'E:/SteamLibrary/steamapps/common/江山北望';
let packsOk = 0;
for (let chap = 0; chap <= 7; chap++) {
  const packPath = `${gameDir}/chapter${chap}_en.pack`;
  if (fs.existsSync(packPath)) {
    const stat = fs.statSync(packPath);
    console.log(`[PASS] chapter${chap}_en.pack present (${(stat.size / 1024).toFixed(1)} KB)`);
    packsOk++;
  } else {
    console.log(`[FAIL] chapter${chap}_en.pack missing!`);
  }
}

console.log(`\nSubtitle Packs Verification: ${packsOk} / 8 packs verified.`);
