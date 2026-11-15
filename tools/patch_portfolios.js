const fs = require('fs');
const path = require('path');
const vm = require('vm');

const storiesEn = require('./character_stories_en.json');

function patchNavigationFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping non-existent file: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const pos = content.indexOf('portfolios:JSON.parse(');
  if (pos === -1) {
    console.log(`portfolios:JSON.parse( not found in ${filePath}`);
    return;
  }

  const parseIdx = pos + 'portfolios:'.length;
  let depth = 0, endIdx = -1;
  for (let i = parseIdx + 'JSON.parse'.length; i < content.length; i++) {
    if (content[i] === '(') depth++;
    else if (content[i] === ')') {
      depth--;
      if (depth === 0) { endIdx = i; break; }
    }
  }

  const oldSnippet = content.slice(parseIdx, endIdx + 1);
  const obj = vm.runInNewContext(oldSnippet);

  // Inject stories and Murong Cui
  for (const [char, val] of Object.entries(storiesEn)) {
    if (!obj[char]) obj[char] = {};
    for (const [k, v] of Object.entries(val)) {
      obj[char][k] = v;
    }
  }

  const newSnippet = 'JSON.parse(' + JSON.stringify(JSON.stringify(obj)) + ')';
  const patchedContent = content.slice(0, parseIdx) + newSnippet + content.slice(endIdx + 1);

  fs.writeFileSync(filePath, patchedContent, 'utf8');
  console.log(`Successfully patched portfolios in ${filePath}`);
}

module.exports = { patchNavigationFile };

if (require.main === module) {
  const targetDir = process.argv[2] || '.';
  const file1 = path.join(targetDir, 'renderer/main_window/assets/navigation-u2NlFcJa.js');
  const file2 = path.join(targetDir, 'renderer/main_window/assets/navigation-legacy-ByshlEeU.js');
  patchNavigationFile(file1);
  patchNavigationFile(file2);
}
