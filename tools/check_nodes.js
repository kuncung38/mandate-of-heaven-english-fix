const fs = require('fs');
const path = require('path');
const dir = 'resources/extracted_app/renderer/main_window/assets';

for (const file of fs.readdirSync(dir)) {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const count = (content.match(/a01_a048/g) || []).length;
    if (count > 0) {
      console.log(`${file}: ${count} matches of a01_a048`);
    }
  }
}
