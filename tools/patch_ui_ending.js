const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = 'E:/SteamLibrary/steamapps/common/\u6C5F\u5C71\u5317\u671B/resources/extracted_app';
const assetsDir = path.join(baseDir, 'renderer/main_window/assets');

// 1. Patch navigation-DQdXAQm4.js
const modernNavPath = path.join(assetsDir, 'navigation-DQdXAQm4.js');
let modernNav = fs.readFileSync(modernNavPath, 'utf8');

const targetEn = 'dlc_product_price:`Price`,enter_chapter:`Enter Chapter`';
const replaceEn = 'dlc_product_price:`Price`,ending:`THE END`,enter_chapter:`Enter Chapter`';

const targetZh = 'dlc_product_price:`价格`,enter_chapter:`进入章节`';
const replaceZh = 'dlc_product_price:`价格`,ending:`完`,enter_chapter:`进入章节`';

if (!modernNav.includes(targetEn)) {
  console.error('ERROR: targetEn not found in modern navigation.js');
} else {
  modernNav = modernNav.replace(targetEn, replaceEn);
  console.log('1a. Added ending:`THE END` to modern navigation.js');
}

if (!modernNav.includes(targetZh)) {
  console.error('ERROR: targetZh not found in modern navigation.js');
} else {
  modernNav = modernNav.replace(targetZh, replaceZh);
  console.log('1b. Added ending:`完` to modern navigation.js');
}

fs.writeFileSync(modernNavPath, modernNav, 'utf8');

// 2. Patch navigation-legacy-CtiewUfA.js
const legacyNavPath = path.join(assetsDir, 'navigation-legacy-CtiewUfA.js');
let legacyNav = fs.readFileSync(legacyNavPath, 'utf8');

const targetLegacyEn = 'dlc_product_price:"Price",enter_chapter:"Enter Chapter"';
const replaceLegacyEn = 'dlc_product_price:"Price",ending:"THE END",enter_chapter:"Enter Chapter"';

const targetLegacyZh = 'dlc_product_price:"价格",enter_chapter:"进入章节"';
const replaceLegacyZh = 'dlc_product_price:"价格",ending:"完",enter_chapter:"进入章节"';

if (!legacyNav.includes(targetLegacyEn)) {
  console.error('ERROR: targetLegacyEn not found in legacy navigation.js');
} else {
  legacyNav = legacyNav.replace(targetLegacyEn, replaceLegacyEn);
  console.log('2a. Added ending:"THE END" to legacy navigation.js');
}

if (!legacyNav.includes(targetLegacyZh)) {
  console.error('ERROR: targetLegacyZh not found in legacy navigation.js');
} else {
  legacyNav = legacyNav.replace(targetLegacyZh, replaceLegacyZh);
  console.log('2b. Added ending:"完" to legacy navigation.js');
}

fs.writeFileSync(legacyNavPath, legacyNav, 'utf8');

// 3. Patch screen-sleep-CMg9xret.js
const modernSleepPath = path.join(assetsDir, 'screen-sleep-CMg9xret.js');
let modernSleep = fs.readFileSync(modernSleepPath, 'utf8');

const targetSleep = 'm(`span`,{class:`title-lower`},S(c.ending?(x(r)(`ui.ending`)||`THE END`):x(r)(`chapters.${c.chapter}.title`)),1)';
const replaceSleep = 'm(`span`,{class:`title-lower`},S(c.ending?((x(r)(`ui.ending`)===`ui.ending`||!x(r)(`ui.ending`))?`THE END`:x(r)(`ui.ending`)):x(r)(`chapters.${c.chapter}.title`)),1)';

if (!modernSleep.includes(targetSleep)) {
  console.error('ERROR: targetSleep not found in modern screen-sleep.js');
} else {
  modernSleep = modernSleep.replace(targetSleep, replaceSleep);
  console.log('3. Patched ending fallback in modern screen-sleep.js');
}

fs.writeFileSync(modernSleepPath, modernSleep, 'utf8');

// 4. Patch screen-sleep-legacy-Cbt62F3h.js
const legacySleepPath = path.join(assetsDir, 'screen-sleep-legacy-Cbt62F3h.js');
let legacySleep = fs.readFileSync(legacySleepPath, 'utf8');

const targetLegacySleep = 'y("span",{class:"title-lower"},r.ending?(x(i)("ui.ending")||"THE END"):x(i)(`chapters.${r.chapter}.title`),1)';
const replaceLegacySleep = 'y("span",{class:"title-lower"},r.ending?((x(i)("ui.ending")==="ui.ending"||!x(i)("ui.ending"))?"THE END":x(i)("ui.ending")):x(i)(`chapters.${r.chapter}.title`),1)';

if (!legacySleep.includes(targetLegacySleep)) {
  console.error('ERROR: targetLegacySleep not found in legacy screen-sleep.js');
} else {
  legacySleep = legacySleep.replace(targetLegacySleep, replaceLegacySleep);
  console.log('4. Patched ending fallback in legacy screen-sleep.js');
}

fs.writeFileSync(legacySleepPath, legacySleep, 'utf8');

// 5. Verify AST on all modified files
const filesToVerify = [modernNavPath, legacyNavPath, modernSleepPath, legacySleepPath];
for (const p of filesToVerify) {
  try {
    new vm.SourceTextModule(fs.readFileSync(p, 'utf8'));
    console.log(`AST PASS: ${path.basename(p)}`);
  } catch (e) {
    console.error(`AST FAIL in ${path.basename(p)}:`, e.message);
  }
}
