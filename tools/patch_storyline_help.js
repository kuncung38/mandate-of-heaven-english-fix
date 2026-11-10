const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = 'E:/SteamLibrary/steamapps/common/\u6C5F\u5C71\u5317\u671B/resources/extracted_app';
const assetsDir = path.join(baseDir, 'renderer/main_window/assets');

// 1. Copy storyline_help_en.svg to assets
const svgSrc = 'C:/Users/user/.gemini/antigravity/brain/6c8f5a3f-e067-49b5-bfab-092c166fce3c/scratch/storyline_help_en.svg';
const svgDest = path.join(assetsDir, 'storyline_help_en.svg');
fs.copyFileSync(svgSrc, svgDest);
console.log('1. Copied storyline_help_en.svg to assets. Size:', fs.statSync(svgDest).size);

// 2. Patch StorylineView-D_jd21fC.js
const modernJsPath = path.join(assetsDir, 'StorylineView-D_jd21fC.js');
let modernJs = fs.readFileSync(modernJsPath, 'utf8');

// Replace Help image source
const oldHelpImg = 'new URL(`说明页面-BOVzz24f.webp`,import.meta.url)';
const newHelpImg = 'new URL(`storyline_help_en.svg`,import.meta.url)';

if (!modernJs.includes(oldHelpImg)) {
  console.error('ERROR: oldHelpImg not found in StorylineView-D_jd21fC.js');
} else {
  modernJs = modernJs.replace(oldHelpImg, newHelpImg);
  console.log('2a. Replaced Help image source in modern JS');
}

// Add tooltips to buttons
const oldButtons = 'd(j,{"normal-src":_($e),"highlighted-src":_(et),height:`36pxp`,width:`36pxp`,onClick:S},null,8,[`normal-src`,`highlighted-src`]),d(j,{"normal-src":_(Qe),"highlighted-src":_($),height:`36pxp`,width:`36pxp`,onClick:E},null,8,[`normal-src`,`highlighted-src`])';
const newButtons = 'd(j,{"normal-src":_($e),"highlighted-src":_(et),height:`36pxp`,width:`36pxp`,onClick:S,title:`Locate Current Scene`,"data-tooltip":`Locate Current Scene`},null,8,[`normal-src`,`highlighted-src`]),d(j,{"normal-src":_(Qe),"highlighted-src":_($),height:`36pxp`,width:`36pxp`,onClick:E,title:`Storyline Guide`,"data-tooltip":`Storyline Guide`},null,8,[`normal-src`,`highlighted-src`])';

if (!modernJs.includes(oldButtons)) {
  console.error('ERROR: oldButtons not found in StorylineView-D_jd21fC.js');
} else {
  modernJs = modernJs.replace(oldButtons, newButtons);
  console.log('2b. Added tooltips to modern buttons');
}

fs.writeFileSync(modernJsPath, modernJs, 'utf8');

// 3. Patch StorylineView-legacy-BQUEwMNi.js
const legacyJsPath = path.join(assetsDir, 'StorylineView-legacy-BQUEwMNi.js');
let legacyJs = fs.readFileSync(legacyJsPath, 'utf8');

const oldLegacyHelp = 'new URL("说明页面-BOVzz24f.webp",t.meta.url)';
const newLegacyHelp = 'new URL("storyline_help_en.svg",t.meta.url)';

if (!legacyJs.includes(oldLegacyHelp)) {
  console.error('ERROR: oldLegacyHelp not found in legacy JS');
} else {
  legacyJs = legacyJs.replace(oldLegacyHelp, newLegacyHelp);
  console.log('3a. Replaced Help image source in legacy JS');
}

fs.writeFileSync(legacyJsPath, legacyJs, 'utf8');

// 4. Update StorylineView-ChC_HFPC.css
const cssPath = path.join(assetsDir, 'StorylineView-ChC_HFPC.css');
let css = fs.readFileSync(cssPath, 'utf8');

const tooltipCss = `
/* Tooltips for Storyline Navigation Controls */
:is(:is(.overlay .controls) .buttons) button {
  position: relative !important;
}
:is(:is(.overlay .controls) .buttons) button[data-tooltip]:hover::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(14, 11, 8, 0.94);
  color: #eeddcc;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 5px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 99999;
  border: 1px solid rgba(212, 175, 55, 0.6);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.85);
  letter-spacing: 0.5px;
}
:is(:is(.overlay .controls) .buttons) button[data-tooltip]:hover::after {
  content: "";
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px 5px 0 5px;
  border-style: solid;
  border-color: rgba(212, 175, 55, 0.6) transparent transparent transparent;
  pointer-events: none;
  z-index: 99999;
}
`;

if (!css.includes('Tooltips for Storyline Navigation Controls')) {
  css += tooltipCss;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('4. Appended tooltip CSS styles');
} else {
  console.log('4. Tooltip CSS already present');
}

// 5. Verify AST on modified JS files
try {
  new vm.SourceTextModule(fs.readFileSync(modernJsPath, 'utf8'));
  console.log('5a. AST PASS: StorylineView-D_jd21fC.js');
} catch (e) {
  console.error('5a. AST FAIL:', e.message);
}

try {
  new vm.SourceTextModule(fs.readFileSync(legacyJsPath, 'utf8'));
  console.log('5b. AST PASS: StorylineView-legacy-BQUEwMNi.js');
} catch (e) {
  console.error('5b. AST FAIL:', e.message);
}

console.log('All changes applied cleanly!');
