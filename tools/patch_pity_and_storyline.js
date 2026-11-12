const fs = require('fs');
const path = require('path');

// Target files in extracted_app:
// 1. renderer/main_window/assets/index-wQ5G7oRV.js
// 2. renderer/main_window/assets/index-legacy-CjzdAG7G.js
// 3. renderer/main_window/assets/StorylineView-D_jd21fC.js
// 4. renderer/main_window/assets/StorylineView-legacy-BQUEwMNi.js

function patch(basePath) {
  // 1. index-wQ5G7oRV.js
  {
    const filePath = path.join(basePath, 'index-wQ5G7oRV.js');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const target = 'case`possibility_trigger`:er(.2)?R(`success`,t.timeline.actions):R(`failure`,t.timeline.actions),t.timeline.actions=[];break;case`count_trigger`:t.variables.luckCounter+1>=3?R(`enough`,t.timeline.actions):R(`not_enough`,t.timeline.actions),t.timeline.actions=[];break;';
      const replacement = 'case`possibility_trigger`:let seekingBe002=t.visited_storylets?.includes(`a01_a032_a032033034035036_ahe001`)&&!t.visited_storylets?.includes(`a01_a080_a029_abe002`);(seekingBe002?!1:er(.2))?R(`success`,t.timeline.actions):R(`failure`,t.timeline.actions),t.timeline.actions=[];break;case`count_trigger`:let forceBe002=t.visited_storylets?.includes(`a01_a032_a032033034035036_ahe001`)&&!t.visited_storylets?.includes(`a01_a080_a029_abe002`);(!forceBe002&&t.variables.luckCounter+1>=3)?(t.variables.luckCounter=0,R(`enough`,t.timeline.actions)):(t.variables.luckCounter=0,R(`not_enough`,t.timeline.actions)),t.timeline.actions=[];break;';
      if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched index-wQ5G7oRV.js');
      }
    }
  }

  // 2. index-legacy-CjzdAG7G.js
  {
    const filePath = path.join(basePath, 'index-legacy-CjzdAG7G.js');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const target = 'case"possibility_trigger":Ft(.2)?q("success",e.timeline.actions):q("failure",e.timeline.actions),e.timeline.actions=[];break;case"count_trigger":e.variables.luckCounter+1>=3?q("enough",e.timeline.actions):q("not_enough",e.timeline.actions),e.timeline.actions=[];break;';
      const replacement = 'case"possibility_trigger":let seekingBe002=e.visited_storylets&&e.visited_storylets.includes("a01_a032_a032033034035036_ahe001")&&!e.visited_storylets.includes("a01_a080_a029_abe002");(seekingBe002?!1:Ft(.2))?q("success",e.timeline.actions):q("failure",e.timeline.actions),e.timeline.actions=[];break;case"count_trigger":let forceBe002=e.visited_storylets&&e.visited_storylets.includes("a01_a032_a032033034035036_ahe001")&&!e.visited_storylets.includes("a01_a080_a029_abe002");(!forceBe002&&e.variables.luckCounter+1>=3)?(e.variables.luckCounter=0,q("enough",e.timeline.actions)):(e.variables.luckCounter=0,q("not_enough",e.timeline.actions)),e.timeline.actions=[];break;';
      if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched index-legacy-CjzdAG7G.js');
      }
    }
  }

  // 3. StorylineView-D_jd21fC.js
  {
    const filePath = path.join(basePath, 'StorylineView-D_jd21fC.js');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const target = 'Object.keys(_(N)[n.chapterId]??{}).length>0?(l(),x(`tr`,Ye,` 本章节请留意： `)):i(``,!0)';
      const replacement = 'Object.keys(_(N)[n.chapterId]??{}).length>0?(l(),x(`tr`,Ye,(_(w)().locale?.value?.startsWith(`zh`)?` 本章节请留意： `:` Key Attributes to Watch: `))):i(``,!0)';
      if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched StorylineView-D_jd21fC.js');
      }
    }
  }

  // 4. StorylineView-legacy-BQUEwMNi.js
  {
    const filePath = path.join(basePath, 'StorylineView-legacy-BQUEwMNi.js');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const target = 'Object.keys(y(ie)[i.chapterId]??{}).length>0?(h(),I("tr",$e," 本章节请留意： ")):r("",!0)';
      const replacement = 'Object.keys(y(ie)[i.chapterId]??{}).length>0?(h(),I("tr",$e,(S().locale?.value?.startsWith("zh")?" 本章节请留意： ":" Key Attributes to Watch: "))):r("",!0)';
      if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched StorylineView-legacy-BQUEwMNi.js');
      }
    }
  }
}

module.exports = { patch };
