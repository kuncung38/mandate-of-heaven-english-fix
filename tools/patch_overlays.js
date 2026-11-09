const fs = require('fs');
const path = require('path');

const At_en = {
  "00_001_001_65": { name: "Xie Ruolan", desc: "Your consort, born of the noble Xie clan of Danling.\\nBound by marriage, the Xie family is your staunch pillar of support." },
  "00_005_002003004005_20": { name: "Chu Huan", desc: "Captain of the Capital Gates.\\nHe guarded you south from the north and holds your deepest trust." },
  "00_005_002003004005_38": { name: "Xie Jian'an", desc: "Head of the Danling Xie clan.\\nFather of Xie Ruolan and Minister of the Imperial Secretariat." },
  "00_005_002003004005_49": { name: "Yu Gong", desc: "Chancellor of the Imperial Academy.\\nLofty and aloof, he commands immense prestige among scholars." },
  "00_067_032_41": { name: "Chen Wan'er", desc: "Daughter of the premier noble clan, the Chen family of Qingzhou.\\nHer granduncle is Chancellor Chen Dao, yielding immense authority." },
  "00_075_034_102": { name: "Wang Ming", desc: "Student of Chancellor Yu Gong." },
  "00_077_036_17": { name: "Sikong Zheng", desc: "Your elder brother by the same mother.\\nEnfeoffed as the Prince of Ning." },
  "01_001_001_8": { name: "Cao Biaozhi", desc: "Vice Minister of Revenue.\\nA rare pragmatist in Great Xuan, upright and capable, disciple of Elder Chen Lang." },
  "01_001_001_24": { name: "Chen Dao", desc: "Patriarch of the Chen clan and Chancellor of the Realm.\\nLeader of all noble families in Great Xuan." },
  "01_005_002003004_88": { name: "Empress Dowager Li", desc: "Birth mother of both you and Sikong Zheng." },
  "01_033_037038_8": { name: "Chen Ying", desc: "Son of Chancellor Chen Dao." },
  "02_001_001002003004_114": { name: "Xie Xuan", desc: "Youngest son of Xie Jian'an and younger brother of Xie Ruolan." },
  "02_011_010015016_54": { name: "Zu Kun", desc: "Highly revered general in the army of Great Xuan." },
  "02_015_011012_41": { name: "Zu Kun", desc: "Highly revered general in the army of Great Xuan." },
  "02_019_013014_35": { name: "Zu Kun", desc: "Highly revered general in the army of Great Xuan." },
  "03_003_002_59": { name: "Xie Xuan", desc: "Commander of the Northern Army." },
  "03_003_002_60": { name: "Zhu Yuanzhi", desc: "Colonel of Barbarian Pacification." },
  "03_030_006B024_44": { name: "Shi Lang", desc: "Left General of the Wunu (Zhao)." },
  "03_031_006C025_45": { name: "Shi Lang", desc: "Left General of the Wunu (Zhao)." },
  "03_036_019020021022023_14": { name: "Shi Lang", desc: "Left General of the Wunu (Zhao)." },
  "03_039_026_10": { name: "Shi Lang", desc: "Left General of the Wunu (Zhao)." },
  "03_040_027_10": { name: "Shi Lang", desc: "Left General of the Wunu (Zhao)." },
  "04_025_005B032033034035_60": { name: "Warning", desc: "High interaction sequence ahead. Prepare yourself!" },
  "05_093_070_71": { name: "Chen Lang", desc: "Venerable forefather of the Chen clan, three-dynasty veteran statesman,\\nformerly Minister of Personnel during the Jianping era." },
  "05_076_057058059060061_20": { name: "Fan Zhong", desc: "Adopted son of Chief Eunuch Wen Xian." },
  "06_001_001002003004005_68": { name: "Sikong Xu", desc: "Your second imperial son, born of Consort Chen Wan'er." },
  "06_001_001002003004005_72": { name: "Sikong Sheng", desc: "Crown Prince of the Realm.\\nYour eldest son, born of the late Empress Xie Ruolan." },
  "06_001_001002003004005_80": { name: "Sikong Yu", desc: "Princess Xunyang.\\nYour youngest daughter, born of Consort Liu Nian." },
  "06_006_006007_3": { name: "Fan Zhong", desc: "Palace Attendant who succeeded Eunuch Wen,\\nnow serving as your personal attendant." },
  "06_006_006007_48": { name: "Chu Meng", desc: "Son of Chu Huan, Colonel of the Feathered Forest Guards.\\nSecretly shielded by you when his father fell from grace;\\nafter exoneration, now your personal bodyguard." },
  "06_022_005B020_83": { name: "Li Dingyuan", desc: "Former Commander of the Imperial Guard.\\nOnce allied with Prince of Ning, retained by you to monitor officials." },
  "06_066_031032033034035_16": { name: "Murong Cui", desc: "Envoy of Yandong, and its most promising young commander." },
  "06_077_044045046047_17": { name: "Qiu Sheng", desc: "Count of Yun County, a veteran warrior once under Liu Dadao,\\nwho earned great military merit at the bloodbath of Yiyang." }
};

const atEnJson = JSON.stringify(At_en);
const assetsDir = 'E:/SteamLibrary/steamapps/common/江山北望/resources/extracted_app/renderer/main_window/assets';

// --- Patch screen-sleep-CMg9xret.js ---
{
  const filePath = path.join(assetsDir, 'screen-sleep-CMg9xret.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert At_en definition
  if (!content.includes('const At_en=')) {
    content = 'const At_en=' + atEnJson + ';' + content;
  }

  // Patch Oe
  const oldModernOe = 'Oe=s(()=>{let e=jt.find(e=>e.video_id===j.instruction.videoId&&R.value&&R.value.currentTime<3);return e?{text:e.value_changed_text,type:e.value_changed_type}:null})';
  const newModernOe = 'Oe=s(()=>{let e=jt.find(e=>e.video_id===j.instruction.videoId&&R.value&&R.value.currentTime<3);if(!e)return null;let T={"皇帝对你的信任":"Emperor\'s Trust","司空正对你的愧疚":"Sikong Zheng\'s Guilt","祖坤对你的好感":"Zu Kun\'s Approval","军心":"Military Morale","刘大刀对你的信任":"Liu Dadao\'s Trust","朱元之的忠诚":"Zhu Yuanzhi\'s Loyalty"},Y={"上升":"+ Increased","下降":"- Decreased"};let isEn=(typeof pe<"u"&&pe.global?.locale?.value==="en")||(typeof c<"u"&&c?.value==="en");return isEn?{text:T[e.value_changed_text]||e.value_changed_text,type:Y[e.value_changed_type]||e.value_changed_type}:{text:e.value_changed_text,type:e.value_changed_type}})';
  if (content.includes(oldModernOe)) {
    content = content.replace(oldModernOe, newModernOe);
    console.log('Successfully patched Oe in screen-sleep-CMg9xret.js');
  } else {
    console.warn('Could not find oldModernOe');
  }

  // Patch ke
  const oldModernKe = 'ke=s(()=>At.find(e=>e.videoId===j.instruction.videoId&&R.value&&R.value.currentTime>=e.time&&R.value.currentTime<e.time+e.duration))';
  const newModernKe = 'ke=s(()=>{let e=At.find(e=>e.videoId===j.instruction.videoId&&R.value&&R.value.currentTime>=e.time&&R.value.currentTime<e.time+e.duration);if(!e)return null;let isEn=(typeof pe<"u"&&pe.global?.locale?.value==="en")||(typeof c<"u"&&c?.value==="en");if(!isEn)return e;let m=At_en[e.videoId+"_"+e.time];return m?{...e,name:m.name,description:m.desc}:e})';
  if (content.includes(oldModernKe)) {
    content = content.replace(oldModernKe, newModernKe);
    console.log('Successfully patched ke in screen-sleep-CMg9xret.js');
  } else {
    console.warn('Could not find oldModernKe');
  }

  // Patch QTE text
  content = content.replace(/m\(`div`,{class:`qte-text`},`点击`,-1\)/g, 'm(`div`,{class:`qte-text`},pe.global.locale.value===`en`?`Tap`:`点击`)');
  content = content.replace(/m\(`div`,{class:`qte-text`},`长按`,-1\)/g, 'm(`div`,{class:`qte-text`},pe.global.locale.value===`en`?`Hold`:`长按`)');

  // Patch spoiler warning buttons
  content = content.replace(/cancelText:`我再试试`,confirmText:`查看攻略`/g, 'cancelText:pe.global.locale.value===`en`?`Try Again`:`我再试试`,confirmText:pe.global.locale.value===`en`?`View Guide`:`查看攻略`');
  content = content.replace(/confirmText:`关闭提示`/g, 'confirmText:pe.global.locale.value===`en`?`Close Hint`:`关闭提示`');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Saved screen-sleep-CMg9xret.js');
}

// --- Patch screen-sleep-legacy-Cbt62F3h.js ---
{
  const filePath = path.join(assetsDir, 'screen-sleep-legacy-Cbt62F3h.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert At_en definition
  if (!content.includes('const At_en=')) {
    content = 'const At_en=' + atEnJson + ';' + content;
  }

  // Patch Ae (legacy Oe)
  const oldLegacyAe = 'Ae=s(()=>{const e=Rt.find(e=>e.video_id===M.instruction.videoId&&P.value&&P.value.currentTime<3);return e?{text:e.value_changed_text,type:e.value_changed_type}:null})';
  const newLegacyAe = 'Ae=s(()=>{const e=Rt.find(e=>e.video_id===M.instruction.videoId&&P.value&&P.value.currentTime<3);if(!e)return null;let T={"皇帝对你的信任":"Emperor\'s Trust","司空正对你的愧疚":"Sikong Zheng\'s Guilt","祖坤对你的好感":"Zu Kun\'s Approval","军心":"Military Morale","刘大刀对你的信任":"Liu Dadao\'s Trust","朱元之的忠诚":"Zhu Yuanzhi\'s Loyalty"},Y={"上升":"+ Increased","下降":"- Decreased"};let isEn=(typeof ae<"u"&&ae.global?.locale?.value==="en");return isEn?{text:T[e.value_changed_text]||e.value_changed_text,type:Y[e.value_changed_type]||e.value_changed_type}:{text:e.value_changed_text,type:e.value_changed_type}})';
  if (content.includes(oldLegacyAe)) {
    content = content.replace(oldLegacyAe, newLegacyAe);
    console.log('Successfully patched Ae in screen-sleep-legacy-Cbt62F3h.js');
  } else {
    console.warn('Could not find oldLegacyAe');
  }

  // Patch fe (legacy ke)
  const oldLegacyFe = 'fe=s(()=>Tt.find(e=>e.videoId===M.instruction.videoId&&P.value&&P.value.currentTime>=e.time&&P.value.currentTime<e.time+e.duration))';
  const newLegacyFe = 'fe=s(()=>{let e=Tt.find(e=>e.videoId===M.instruction.videoId&&P.value&&P.value.currentTime>=e.time&&P.value.currentTime<e.time+e.duration);if(!e)return null;let isEn=(typeof ae<"u"&&ae.global?.locale?.value==="en");if(!isEn)return e;let m=At_en[e.videoId+"_"+e.time];return m?{...e,name:m.name,description:m.desc}:e})';
  if (content.includes(oldLegacyFe)) {
    content = content.replace(oldLegacyFe, newLegacyFe);
    console.log('Successfully patched fe in screen-sleep-legacy-Cbt62F3h.js');
  } else {
    console.warn('Could not find oldLegacyFe');
  }

  // Patch QTE text in legacy
  content = content.replace(/y\("div",{class:"qte-text"},"点击",-1\)/g, 'y("div",{class:"qte-text"},ae.global.locale.value==="en"?"Tap":"点击")');
  content = content.replace(/y\("div",{class:"qte-text"},"长按",-1\)/g, 'y("div",{class:"qte-text"},ae.global.locale.value==="en"?"Hold":"长按")');

  // Patch spoiler warning buttons in legacy
  content = content.replace(/cancelText:"我再试试",confirmText:"查看攻略"/g, 'cancelText:ae.global.locale.value==="en"?"Try Again":"我再试试",confirmText:ae.global.locale.value==="en"?"View Guide":"查看攻略"');
  content = content.replace(/confirmText:"关闭提示"/g, 'confirmText:ae.global.locale.value==="en"?"Close Hint":"关闭提示"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Saved screen-sleep-legacy-Cbt62F3h.js');
}

console.log('All screen-sleep overlays patched successfully!');
