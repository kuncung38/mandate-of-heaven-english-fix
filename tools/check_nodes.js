const fs = require('fs');
const content = fs.readFileSync('resources/extracted_app/renderer/main_window/assets/navigation-DQdXAQm4.js', 'utf8');

let idx = 0;
while ((idx = content.indexOf('a01_a048', idx)) !== -1) {
  console.log('Index:', idx);
  // Show 100 characters before and after
  console.log(content.slice(Math.max(0, idx - 50), idx + 100));
  idx += 8;
}
