const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = 'E:/SteamLibrary/steamapps/common/江山北望/resources/extracted_app';
const assetsDir = path.join(baseDir, 'renderer/main_window/assets');

console.log('=== Step 1: Update navigation-DQdXAQm4.js Prologue description ===');
const navPath = path.join(assetsDir, 'navigation-DQdXAQm4.js');
let navJs = fs.readFileSync(navPath, 'utf8');

const oldPrologueDesc = `Since its founding, the Xuan Kingdom has suffered a string of incompetent rulers. Court factions tore the realm apart, and the Wunu (a northern barbarian tribe) seized the opportunity to invade, swiftly capturing Guanzhong. The capital city of Yong’an soon fell. Royals were taken captive, and countless civilians were massacred. Only the natural defense of the Tianhe River allowed half the kingdom to survive. Sikong Jing, Prince of Langya and a distant member of the royal bloodline, was raised to the throne by the Imperial Chancellor Chen Dao and the powerful noble families, carrying on the imperial legacy south of the Tianhe River. You are Sikong Yao, the emperor’s second son, ennobled as the Prince of Jin. In this age of turmoil, what path will you choose? What fate awaits the realm? History lies in your hands.`;

const newPrologueDesc = `Following its early prosperity, the Xuan Kingdom fell into decline under corrupt rulers and bitter court strife. Northern invaders seized the moment to sack the capital of Yong’an, taking royals captive and slaughtering civilians. Only the natural barrier of the Tianhe River spared half the realm. South of the river, Chancellor Chen Dao and the noble clans enthroned Sikong Jing, Prince of Langya, to carry on the imperial dynasty.`;

if (navJs.includes(oldPrologueDesc)) {
  navJs = navJs.replace(oldPrologueDesc, newPrologueDesc);
  new vm.SourceTextModule(navJs);
  fs.writeFileSync(navPath, navJs, 'utf8');
  console.log('navigation-DQdXAQm4.js Prologue updated to concise translation.');
} else {
  console.log('Note: oldPrologueDesc not found verbatim in modern navJs.');
}

// Legacy navigation
const navLegacyPath = path.join(assetsDir, 'navigation-legacy-CtiewUfA.js');
let navLegacyJs = fs.readFileSync(navLegacyPath, 'utf8');
if (navLegacyJs.includes(oldPrologueDesc)) {
  navLegacyJs = navLegacyJs.replace(oldPrologueDesc, newPrologueDesc);
  new vm.Script(navLegacyJs);
  fs.writeFileSync(navLegacyPath, navLegacyJs, 'utf8');
  console.log('navigation-legacy Prologue updated to concise translation.');
}

console.log('=== Step 2: Update ChapterView-LZoyL_zx.css with 20px readable font ===');
const cssPath = path.join(assetsDir, 'ChapterView-LZoyL_zx.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the 13.5px / 18.5px rules with readable 20px / 27px
css = css.replace(/font-size:calc\(13\.5px/g, 'font-size:calc(20px');
css = css.replace(/line-height:calc\(18\.5px/g, 'line-height:calc(27px');
css = css.replace(/font-size: calc\(14px/g, 'font-size: calc(20px');
css = css.replace(/line-height: calc\(19px/g, 'line-height: calc(27px');
css = css.replace(/text-indent:calc\(20px/g, 'text-indent:calc(36px');
css = css.replace(/text-indent: calc\(20px/g, 'text-indent: calc(36px');
css = css.replace(/max-height:calc\(120px/g, 'max-height:calc(135px');
css = css.replace(/max-height: calc\(130px/g, 'max-height: calc(135px');

fs.writeFileSync(cssPath, css, 'utf8');
console.log('ChapterView CSS updated to 20px readable font.');

console.log('=== Step 3: Update ChapterView-DffnSbqX.js inline styles to 20px ===');
const chapJsPath = path.join(assetsDir, 'ChapterView-DffnSbqX.js');
let chapJs = fs.readFileSync(chapJsPath, 'utf8');

chapJs = chapJs.replace(/13\.5px/g, '20px');
chapJs = chapJs.replace(/18\.5px/g, '27px');
chapJs = chapJs.replace(/text-indent:calc\(20px/g, 'text-indent:calc(36px');
chapJs = chapJs.replace(/max-height:calc\(120px/g, 'max-height:calc(135px');

new vm.SourceTextModule(chapJs);
fs.writeFileSync(chapJsPath, chapJs, 'utf8');
console.log('ChapterView-DffnSbqX.js inline styles updated to 20px.');

// ChapterView legacy
const chapLegacyPath = path.join(assetsDir, 'ChapterView-legacy-u3AdcQm7.js');
let chapLegacyJs = fs.readFileSync(chapLegacyPath, 'utf8');

chapLegacyJs = chapLegacyJs.replace(/13\.5px/g, '20px');
chapLegacyJs = chapLegacyJs.replace(/18\.5px/g, '27px');
chapLegacyJs = chapLegacyJs.replace(/text-indent:calc\(20px/g, 'text-indent:calc(36px');
chapLegacyJs = chapLegacyJs.replace(/max-height:calc\(120px/g, 'max-height:calc(135px');

new vm.Script(chapLegacyJs);
fs.writeFileSync(chapLegacyPath, chapLegacyJs, 'utf8');
console.log('ChapterView legacy inline styles updated to 20px.');

console.log('Readable typography fix complete.');
