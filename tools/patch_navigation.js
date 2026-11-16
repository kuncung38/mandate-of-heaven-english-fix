const fs = require('fs');
const path = require('path');

const englishUI = {
  achievements: "Achievements",
  album: "Gallery",
  announcements: "Announcements",
  back: "Back",
  cancel: "Cancel",
  chapters: "Chapters",
  character_intro: "Character Dossier",
  character_stories: "Character Stories",
  character_story_locked: "Locked in current progress",
  close_dialog: "Close",
  confirm: "Confirm",
  continue_game: "Continue Game",
  credits: "Credits",
  current_progress: "Current Progress",
  delete_account: "Delete Account",
  dlc_product_buy: "Purchase",
  dlc_product_price: "Price",
  enter_chapter: "Enter Chapter",
  error_initial_sync: "Login failed: {error}. Please check your network connection.",
  error_network: "Network error: {error}. Please check your network connection.",
  help_spoiler_warning: "Exploring freely provides the best immersion.\nViewing guide hints may spoil the experience.\nDo you still wish to view the guide for this node?",
  license: "Terms of Service",
  load_game: "Continue Story",
  loading: "Loading...",
  main_menu: "Main Menu",
  account_deletion_open: "Go to Account Deletion",
  account_deletion_warning: "You will be redirected to the official website to submit an account deletion request. Proceed to the deletion page?",
  mute: "Mute",
  new_game: "New Game",
  next: "Fast Forward",
  next_chapter: "Next Chapter",
  privacy_policy: "Privacy Policy",
  pause: "Pause",
  play: "Play",
  portfolios: "Character Files",
  progress_bar: "Progress",
  resource_download_aria_label: "Resource Download",
  resource_download_calculating: "Calculating...",
  resource_download_checked_files: "Verified {completed} / {total} files",
  resource_download_checking: "Checking resources...",
  resource_download_complete_message: "Confirming will reload the application and verify resources.",
  resource_download_complete_title: "Download Complete",
  resource_download_confirm_title: "Download Resources",
  resource_download_downloading: "Downloading resources...",
  resource_download_error_clear_partial: "Failed to delete temporary download file: {path}",
  resource_download_error_delete_file: "Failed to delete outdated resource file: {filename}",
  resource_download_error_fetch_manifest: "Failed to fetch resource manifest: Server returned {status}.",
  resource_download_error_fetch_manifest_network: "Failed to fetch resource manifest. Please check your network connection and retry.",
  resource_download_error_files_failed: "Failed to download {count} resource file(s). Please check your network connection and retry. Failed files: {files}",
  resource_download_error_missing_planned_size: "Missing planned size for resource: {filename}",
  resource_download_error_remote_file_size: "Failed to get remote file size: {filename}",
  resource_download_error_unexpected: "Resource initialization failed: {error}",
  resource_download_error_unknown: "Resource initialization failed. Please check your network connection and retry.",
  resource_download_failed_count: "{count} failed",
  resource_download_failed_title: "Download Failed",
  resource_download_prompt: "{size} of resources will be downloaded.\nYou may continue after the download finishes.",
  resource_download_recent_file: "Recent: {filename}",
  resource_download_remaining: "Remaining:",
  resource_download_speed: "Speed:",
  resource_download_start: "Start Download",
  resource_download_time_hours_minutes: "{hours} hr {minutes} min",
  resource_download_time_minutes_seconds: "{minutes} min {seconds} sec",
  resource_download_time_seconds: "{seconds} sec",
  resource_download_waiting: "Waiting...",
  qte_drag: "Drag along the path",
  qte_slide_left: "Swipe Left",
  qte_slide_right: "Swipe Right",
  quit: "Exit Game",
  rate_select: "Speed",
  reset_game: "Restart from Beginning",
  settings: "Settings",
  storyline: "Storyline Flowchart",
  storyline_help: "Guide Hint",
  test_version_warning: "This is an internal build and does not represent final quality.",
  to_storyline: "Back to Storyline",
  ui_language: "Language",
  video_list: "Video List",
  volume_bgm: "BGM Volume",
  volume_efx: "SFX Volume",
  volume_main: "Master Volume",
  volume_video: "Video Volume"
};

const englishValues = {
  军心: "Military Morale",
  司空正的愧疚: "Sikong Zheng's Guilt",
  朱元之的忠心: "Zhu Yuanzhi's Loyalty",
  祖坤好感度: "Zu Kun's Approval",
  老皇帝的认可度: "Emperor's Trust"
};

function formatJsObject(obj, useBackticks = true) {
  const parts = [];
  for (const [k, v] of Object.entries(obj)) {
    const q = useBackticks ? `\`${v.replace(/`/g, '\\`')}\`` : JSON.stringify(v);
    parts.push(`${k}:${q}`);
  }
  return '{' + parts.join(',') + '}';
}

const basePath = 'E:/SteamLibrary/steamapps/common/江山北望/resources/extracted_app/renderer/main_window/assets';

// --- 1. Patch navigation-DQdXAQm4.js ---
{
  const navPath = path.join(basePath, 'navigation-DQdXAQm4.js');
  let content = fs.readFileSync(navPath, 'utf8');

  // Change default locale variable S
  content = content.replace(/S=`zh-cmn-Hans`,ye=\{/g, "S=`en`,ye={");

  // Change localized_name to English
  content = content.replace(/localized_name:`English \(Beta\)`/g, "localized_name:`English`");

  // Replace me.ui
  const meUiStart = content.indexOf('ui:{achievements:');
  const meUiEnd = content.indexOf('},values:{', meUiStart);
  if (meUiStart !== -1 && meUiEnd !== -1) {
    const newUiStr = 'ui:' + formatJsObject(englishUI, true);
    content = content.slice(0, meUiStart) + newUiStr + content.slice(meUiEnd);
    console.log('Successfully replaced me.ui in navigation-DQdXAQm4.js');
  } else {
    console.warn('Could not find me.ui boundaries in navigation-DQdXAQm4.js');
  }

  // Replace me.values
  const meValStart = content.indexOf('values:{军心:');
  const meValEnd = content.indexOf('}},S=', meValStart);
  if (meValStart !== -1 && meValEnd !== -1) {
    const newValStr = 'values:' + formatJsObject(englishValues, true);
    content = content.slice(0, meValStart) + newValStr + content.slice(meValEnd);
    console.log('Successfully replaced me.values in navigation-DQdXAQm4.js');
  } else {
    console.warn('Could not find me.values boundaries in navigation-DQdXAQm4.js');
  }

  // Patch locale(e) function in Ye
  const oldLocaleFn = "locale(e){return this.content.locales[e.language]??this.content.locales.zh_CN??{}}";
  const newLocaleFn = 'locale(e){let u=(typeof C<"u"&&C.global?.locale?.value)?C.global.locale.value:(typeof H<"u"&&H.global?.locale?.value)?H.global.locale.value:null;let m={"en":"en","ja":"ja_JP","ko":"ko_KR","ru":"ru_RU","zh-cmn-Hans":"zh_CN"};let l=(u&&m[u])||m[e?.language]||e?.language||"en";return this.content.locales[l]??this.content.locales[e?.language]??this.content.locales.en??this.content.locales.zh_CN??{}}';
  if (content.includes(oldLocaleFn)) {
    content = content.replace(oldLocaleFn, newLocaleFn);
    console.log('Successfully patched locale(e) in navigation-DQdXAQm4.js');
  }

  // Patch createGame default language
  content = content.replace(/createGame\(e=`zh_CN`\)\{/g, 'createGame(e=`en`){');

  // Patch Qe default language
  content = content.replace(/l\(this,`language`,`zh_CN`\)/g, 'l(this,`language`,`en`)');

  fs.writeFileSync(navPath, content, 'utf8');
  console.log('Saved navigation-DQdXAQm4.js');
}

// --- 2. Patch navigation-legacy-CtiewUfA.js ---
{
  const navPath = path.join(basePath, 'navigation-legacy-CtiewUfA.js');
  let content = fs.readFileSync(navPath, 'utf8');

  // Change default locale variable E
  content = content.replace(/e\("k",E="zh-cmn-Hans"\),O=\{/g, 'e("k",E="en"),O={');

  // Change localized_name to English
  content = content.replace(/localized_name:"English \(Beta\)"/g, 'localized_name:"English"');

  // Replace Y.ui
  const yUiStart = content.indexOf('ui:{achievements:');
  const yUiEnd = content.indexOf('},values:{', yUiStart);
  if (yUiStart !== -1 && yUiEnd !== -1) {
    const newUiStr = 'ui:' + formatJsObject(englishUI, false);
    content = content.slice(0, yUiStart) + newUiStr + content.slice(yUiEnd);
    console.log('Successfully replaced Y.ui in navigation-legacy-CtiewUfA.js');
  }

  // Replace Y.values
  const yValStart = content.indexOf('values:{军心:');
  const yValEnd = content.indexOf('}},e("k",E=', yValStart);
  if (yValStart !== -1 && yValEnd !== -1) {
    const newValStr = 'values:' + formatJsObject(englishValues, false);
    content = content.slice(0, yValStart) + newValStr + content.slice(yValEnd);
    console.log('Successfully replaced Y.values in navigation-legacy-CtiewUfA.js');
  }

  // Patch locale(e) function in Ye
  const oldLocaleFn = "locale(e){return this.content.locales[e.language]??this.content.locales.zh_CN??{}}";
  const newLocaleFn = 'locale(e){let u=(typeof C<"u"&&C.global?.locale?.value)?C.global.locale.value:(typeof H<"u"&&H.global?.locale?.value)?H.global.locale.value:null;let m={"en":"en","ja":"ja_JP","ko":"ko_KR","ru":"ru_RU","zh-cmn-Hans":"zh_CN"};let l=(u&&m[u])||m[e?.language]||e?.language||"en";return this.content.locales[l]??this.content.locales[e?.language]??this.content.locales.en??this.content.locales.zh_CN??{}}';
  if (content.includes(oldLocaleFn)) {
    content = content.replace(oldLocaleFn, newLocaleFn);
    console.log('Successfully patched locale(e) in navigation-legacy-CtiewUfA.js');
  }

  content = content.replace(/createGame\(e="zh_CN"\)\{/g, 'createGame(e="en"){');
  content = content.replace(/this\.language="zh_CN"/g, 'this.language="en"');

  fs.writeFileSync(navPath, content, 'utf8');
  console.log('Saved navigation-legacy-CtiewUfA.js');
}

// --- 3. Patch index-wQ5G7oRV.js ---
{
  const indexPath = path.join(basePath, 'index-wQ5G7oRV.js');
  let content = fs.readFileSync(indexPath, 'utf8');

  // Fallback in ui store: r.value || await pr() || `zh-cmn-Hans`
  content = content.replace(/r\.value\|\|await pr\(\)\|\|`zh-cmn-Hans`/g, 'r.value||await pr()||`en`');

  // Locale header fallback in saves.initialize: t.api.getJsonHeaders().Locale||`zh_CN`
  content = content.replace(/t\.api\.getJsonHeaders\(\)\.Locale\|\|`zh_CN`/g, 't.api.getJsonHeaders().Locale||`en`');

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Saved index-wQ5G7oRV.js');
}

// --- 4. Patch index-legacy-CjzdAG7G.js ---
{
  const indexPath = path.join(basePath, 'index-legacy-CjzdAG7G.js');
  let content = fs.readFileSync(indexPath, 'utf8');

  content = content.replace(/i\.value\|\|await Qt\(\)\|\|"zh-cmn-Hans"/g, 'i.value||await Qt()||"en"');
  content = content.replace(/e\.api\.getJsonHeaders\(\)\.Locale\|\|"zh_CN"/g, 'e.api.getJsonHeaders().Locale||"en"');

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Saved index-legacy-CjzdAG7G.js');
}

console.log('All patches applied successfully!');
