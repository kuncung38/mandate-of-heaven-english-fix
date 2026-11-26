# Mandate of Heaven (江山北望 / Jiangshan Beiwang) — Complete English Patch, Subtitle & Flowchart Fix Mod

[![Game Version](https://img.shields.io/badge/Game%20Version-v2.0.2-blue.svg)](https://store.steampowered.com/app/3831120/)
[![Mod Version](https://img.shields.io/badge/Mod%20Version-v2.1.0-brightgreen.svg)](https://github.com/kuncung38/mandate-of-heaven-english-fix/releases)
[![Platforms](https://img.shields.io/badge/Platforms-Windows%20%7C%20macOS%20%7C%20Linux%20%2F%20Steam%20Deck-lightgrey.svg)](#installation)
[![Steam App ID](https://img.shields.io/badge/Steam%20App%20ID-3831120-orange.svg)](https://store.steampowered.com/app/3831120/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The complete **English translation patch, missing subtitle restorer, and story flowchart bug-fix mod** for ***Mandate of Heaven*** (《江山北望》 / *Jiangshan Beiwang*, Steam App `3831120`) on **Windows, macOS (Apple Silicon & Intel), and Linux / Steam Deck**.

Tested end-to-end across **all 8 chapters (Chapters 0–7)**, **613 videos**, **615 WebVTT subtitle files**, **49 Bad Endings**, and **all 10 Main Dynastic Endings** to **100% completion and 100% Steam achievements**.

---

## 🎮 What This Mod Fixes

### 1. 🔤 Boot Directly into English (No More Mandarin/Japanese Menus)
* **Official Bug:** The game booted by default into Chinese (`zh-cmn-Hans`). Worse, the developer's English dictionary had Japanese placeholder strings (`"設定"`, `"物語を始める"`), causing English mode to display Asian characters.
* **Our Fix:** The game launches directly into clean, polished English across all main menus, pause menus, settings, and flowchart screens.

### 2. ⚡ In-Game Choices Language Bug (Choices Locked in Chinese)
* **Official Bug:** When a save was created, the engine hardcoded `language: "zh_CN"` in the save snapshot. During gameplay, `locale(e)` queried the save's creation language, locking choice buttons to Chinese even if you selected English in settings or skipped videos.
* **Our Fix:** The choice engine dynamically tracks the active Vue UI locale. All choices now display in English at all times, including on existing saves and after video skips.

### 3. 📜 33 Character Dossier Video Popups Localized
* **Official Bug:** In the official release, character dossiers that pop up during video playback were hardcoded in raw Chinese with code artifacts (like literal `\n` escapes e.g. `"Danling.\nBound by marriage..."`).
* **Our Fix:** All 33 character intros (Consort Xie Ruolan, Chu Huan, Chancellor Chen Dao, Prince Sikong Zheng, General Zu Kun, Cao Biaozhi, Empress Dowager Li, etc.) are fully localized into clean, natural English with sanitized formatting.

### 4. 📈 Trust & Morale Gain/Loss Alerts Translated
* **Official Bug:** All stat-change overlay banners (`"皇帝对你的信任 上升"`, `"军心 下降"`) appeared in raw Chinese.
* **Our Fix:** Converted into clean English notifications:
  * *Emperor's Trust (+ Increased)*
  * *Military Morale (- Decreased)*
  * *Sikong Zheng's Guilt*
  * *Zu Kun's Approval*
  * *Liu Dadao's Trust*
  * *Zhu Yuanzhi's Loyalty*

### 5. ⏱️ Subtitle Pacing & Readability Fixed (No More Subtitles Too Fast)
* **Official Bug:** English subtitles used a thin Chinese serif font (`SourceHanSerifCN`) with a flimsy 1px outline and no background box, disappearing too fast (55.5% of cues were under 1.0s).
* **Our Fix:**
  * **Typography:** Modern, crisp sans-serif font (`system-ui, Segoe UI, Roboto`) with a semi-transparent dark backing box (`rgba(0, 0, 0, 0.65)`) and multi-layer drop shadow.
  * **Pacing Algorithm:** 6,563 cues across all 8 chapters were extended into natural trailing pauses so players can comfortably read them.
  * **Zero Dialogue Bleed:** As verified across 9,357 transitions, cues **never overlap** or bleed into the next dialogue (guaranteed $\ge 80\text{ ms}$ silence gap before the next dialogue starts).

### 6. 🎬 Missing Scene Subtitles Restored
* **Official Bug:** Official English packs were completely missing subtitle files for key branch scenes.
* **Our Fix:** Restored and translated missing subtitles for:
  * Chapter 2: `02_032_007A021cc.vtt`
  * Chapter 5: `05_013_003B.vtt`
  * Prologue Narrative (`00_001_001.vtt`): Polished opening exposition into natural historical prose.

### 7. 🎯 QTE Prompts & Guide Dialogs
* `"点击"` $\rightarrow$ **"Tap"**
* `"长按"` $\rightarrow$ **"Hold"**
* Spoiler hint buttons localized: **"Try Again"**, **"View Guide"**, **"Close Hint"**

### 8. 🖼️ Chapter Screen Layout, Font Scaling & Calligraphy Title Localization
* **Official Bug:** The chapter description text overflowed and collided with the progress bar and "Enter Chapter" button; attempts to shrink font size made it unreadable. Static Chinese calligraphy images (`上.webp` / `下.webp`) remained on screen.
* **Our Fix:**
  * Scaled font size to a comfortable **20px** with 27px line-height, paired with a concise 74-word translation matching the original Chinese pacing.
  * Leaves **75px+ clean buffer** above the progress bar.
  * Replaced Chinese calligraphy with styled, classical serif titles (**"PROLOGUE" / "Rising Gale"**).

### 9. 🔘 Choice Button Screen Bounds & Multi-Line Wrapping
* **Official Bug:** Left choice buttons with long text overflowed past the left screen edge, cutting off starting words (e.g. `"...umble subject has come to congratulate Father Emperor."`).
* **Our Fix:** Choice font size scaled to **20px**, enabled multi-line wrapping with `max-width: 800px`, and reduced the gradient mask fade from 76.8px to 30px, providing a **130px+ safety margin** from the screen border.

### 10. 🗺️ Storyline Flowchart Missing Node Icons (ASAR Encoding Bug)
* **Official Bug:** Connecting milestone nodes on the storyline path showed broken image icons because Electron's virtual ASAR filesystem failed to resolve URL-encoded Chinese asset filenames (`点-D4Z2mVCy.svg`).
* **Our Fix:** Created an ASCII alias `dot-D4Z2mVCy.svg`, dual-indexed all 52 non-ASCII assets inside `app.asar`, and implemented a fail-safe fallback in `main.js` to load directly via Node's ASAR-aware filesystem.

### 11. 🖱️ Storyline Navigation Hover Tooltips
* Added instant floating tooltips and native HTML titles to the lower-left storyline controls:
  * **Flag Icon:** *"Locate Current Scene"* (instantly pans and centers camera on the active node)
  * **Question Mark Icon:** *"Storyline Guide"*

### 12. 📖 Full English Storyline Guide Modal
* **Official Bug:** Clicking the question mark showed an empty screen or an untranslated 100% Chinese infographic.
* **Our Fix:** Built a 2988×4640 vector guide in English explaining decision revision, hidden storylines, attribute collection, and the complete ending icon legend (Auspicious Cloud, Flame, Bronze Coin, Silver Medallion, Golden Dragon Medallion, Waypoint Nodes).

### 13. 🏁 Chapter Conclusion Title Card Fix (`ui.ending`)
* **Official Bug:** On chapter completion, the screen displayed the raw missing translation key `"ui.ending"`.
* **Our Fix:** Added `ending: "THE END"` to the locale dictionary and added a resilient fallback in `screen-sleep`. Displays **`THE END`** cleanly.

### 14. 📜 Complete On-Screen Mandarin Video Text, Overlays & Trial Aftermath Subtitled (All Chapters 0–7) [v2.0.4.0]
* **Official Bug:** In cinematic video scenes featuring burned-in Mandarin Chinese text (such as court trial aftermaths, parchment calligraphy narrative bridges, live-action white serif narration overlays, imperial temple title cards, and Bad Ending epilogues), the developers provided **zero subtitle cues** in the official English release. Non-Chinese players were left watching scenes with untranslated Chinese text and no subtitles (for example, the prison cell trial outcome in `01_078_066.mp4`, Consort Xie's tragic poisoning epilogue in `01_054_012B053054.mp4`, siege summaries, or imperial posthumous title reveals).
* **Our Fix:** Designed and executed an automated computer vision scanning engine across all **481 non-loop cinematic videos** spanning Chapters 0 through 7:
  * Extracted and analyzed 4,882 candidate frames via headless CDP and algorithmic stroke regularity filters.
  * Cataloged and subtitled all **92 on-screen Chinese text events** (72 Calligraphy Cards, 8 Live-Action White Text Overlays, and 12 Imperial Title & Ending Achievement Cards).
  * Injected and refined cues across **615 WebVTT files (9,913 total cues)** with period-accurate, literary English translations.
  * Clamped all cues to maintain a guaranteed **$\ge 80\text{ ms}$ separation buffer** from adjacent spoken dialogue to eliminate subtitle clipping and visual overlap in the Video.js player.

### 15. 🎭 Full Character Stories & Profiles English Localization (All 24 Stories Across 13 Characters + Murong Cui) [v2.0.5.0]
* **Official Bug:** On the in-game Character Dossier screen (`PortfolioView` / `CharacterView`), while character bios and names were translated into English, all **24 unlockable Character Stories** across 13 major characters and the entire profile for **Murong Cui (慕容崔)** were omitted from the English dictionary (`me.portfolios`), causing `vue-i18n` to fall back to raw Chinese text. For example, General Zu Yue's signature story *不画峨眉* (*Forsaking the Painted Brows*) and *安能折腰* (*How Could She Bend*) displayed in multi-paragraph Chinese prose even when English was selected.
* **Our Fix:**
  * Fully translated all 24 Character Stories and the Murong Cui character profile into period-accurate, literary English capturing the nuances of the imperial court and northern frontier.
  * Injected the complete story and profile hierarchy into both modern (`navigation-u2NlFcJa.js`) and legacy (`navigation-legacy-ByshlEeU.js`) Vue i18n dictionaries in `resources/app.asar`.
  * Verified 100% key parity with the default Chinese dictionary so that every character story renders seamlessly in English:
    * **Zu Yue (祖月):** *Forsaking the Painted Brows*, *How Could She Bend*
    * **Liu Nian (刘念):** *Long Notes of the Flute*, *No Home of Mine*
    * **Sikong Xu (司空旭):** *The Cycle of History*, *The Favored Pavilion*
    * **Sikong Jing (司空景):** *Undercurrents*
    * **Sikong Zheng (司空正):** *Deep Night*, *Winds of Tumult*
    * **Sikong Sheng (司空盛):** *A Solitary Vessel*, *Candlelight in the Dark*
    * **Sikong Yu (司空钰):** *Through the Ages*, *The Golden Branch*
    * **Zhu Yuanzhi (朱元之):** *Lone Wolf*, *Pack of Jackals*
    * **Chu Huan (楚桓):** *Bones in Green Hills, Name in Eternity*
    * **Xie Jian'an (谢建安):** *Sovereign and Subject Estranged*, *Decisive Severance*
    * **Xie Xuan (谢玄):** *A Noble Shuns the Falling Wall*, *Youth in Silken Robes and Spirited Steeds*
    * **Xie Ruolan (谢若兰):** *Beyond the Passing Days*, *One Moon Across a Thousand Leagues*
    * **Chen Wan'er (陈婉儿):** *Awaiting the Approaching Storm*, *Tainted by the Mire*
    * **Murong Cui (慕容崔):** Profile bio and name

### 16. 🧭 Flowchart Variable Sanitizer & 100% Ending / Achievement Fix [v2.1.0]
* **Official Bug:** Ghost `value_changed` lines left behind before `storylet_start` caused `value_check` to miscalculate imperial reform/ending variables, jumping players to the wrong ending or blocking 100% route completion.
* **Our Fix:**
  * Added a universal `value_check` sanitizer across both modern and legacy bundles so variable checks only evaluate lines from the active playthrough (`storylet_start` onward).
  * Preserved all original narrative consequences (e.g., sending the real princess vs. the maid princess in Chapter 6).
  * Fixed Chapter 7's corrupted `07_059_010B.vtt` (official build had an invalid `s\nWEBVTT` header and mismatched Xie Ruolan dialogue instead of Liu Nian's lines) and clamped all 615 VTT cues across Chapters 0–7 to exact `.mp4` durations.

---

## 🚀 Installation

### Windows (1-Click Installer — Recommended)
1. Download `English_Fix_Mod.zip` from the [Releases](https://github.com/kuncung38/mandate-of-heaven-english-fix/releases) tab (or clone this repository).
2. Extract the archive directly into your game directory:
   ```text
   Steam\steamapps\common\江山北望\
   ```
3. Run `install.bat`. It automatically backs up your original files (`.original`), installs the patched `app.asar`, and deploys all 8 `chapter*_en.pack` files.
4. Launch the game from Steam — it boots directly into English.

### macOS & Linux / Steam Deck (`install.sh`)
1. Extract the mod folder into your game directory:
   * **Linux / Steam Deck:** `~/.steam/steam/steamapps/common/江山北望/`
   * **macOS:** `~/Library/Application Support/Steam/steamapps/common/江山北望/`
2. Open Terminal in the mod folder and run:
   ```bash
   chmod +x install.sh uninstall.sh && ./install.sh
   ```
   The installer automatically detects both standard `resources/` layouts and macOS `.app/Contents/Resources/` bundles, and includes native `linux64` and `osx` (`arm64` / `x64`) libraries.

### Manual Installation
1. Copy all 8 `chapter0_en.pack` through `chapter7_en.pack` files into your game root directory (or `Contents/Resources/` on macOS).
2. Copy `resources\app.asar` and `resources\app.asar.unpacked` into your game's `resources\` directory.

---

## ❓ Troubleshooting & FAQ

* **My mod stopped working after a Steam game update!**
  Whenever Steam pushes an official patch, it overwrites `resources/app.asar` and `chapter*_en.pack`. Simply re-run `install.bat` (Windows) or `./install.sh` (macOS/Linux) to reapply all fixes cleanly.
* **Subtitles aren't showing up in a scene after installing while the game was open.**
  Electron memory-maps `.pack` archives at startup. Fully close `江山北望.exe` and relaunch it from Steam so the updated subtitle packs load.
* **Can I still unlock all Steam achievements with this mod?**
  Yes — native Steamworks (`steamworks.js`) and TapSDK binaries are preserved across Windows, macOS, and Linux, and all 100% achievements have been verified in-game.

---

## 🔄 Uninstallation

* **Windows:** Double-click `uninstall.bat` inside your game folder to restore all `.original` backup files.
* **macOS / Linux:** Run `./uninstall.sh`.
* **Steam:** Right-click **Mandate of Heaven** $\rightarrow$ **Properties** $\rightarrow$ **Installed Files** $\rightarrow$ **"Verify integrity of game files"**.

---

## ⚡ Performance Impact

| Metric | Measured Impact | Notes |
| :--- | :---: | :--- |
| **CPU Usage** | **+0.0%** | Native $O(1)$ dictionary lookups; zero loops or background polling. |
| **GPU Usage** | **+0.0%** | Hardware video decoding unchanged; lightweight CSS backdrop. |
| **RAM Usage** | **~0.0%** | Native system fonts reduce font cache overhead compared to heavy CJK OTF fonts. |
| **Framerate** | **Solid 60 FPS** | Identical to vanilla. |

---

## 🛠️ Verification & Test Suite

All engine patches and subtitle integrity are tested via automated verification scripts:
```bash
node tools/verify.js
```

Test Results:
* **App Engine & Overlays:** 16 / 16 checks **PASSED**
* **Subtitle Packs:** 8 / 8 packs **PASSED**
* **Dialogue Transition Overlaps:** 0 overlaps detected across 9,357 transitions.

---

## ❤️ Support

If this mod improved your *Mandate of Heaven* experience, you can support my work here:
* **International (PayPal / Card / Apple Pay / Google Pay):** [SociaBuzz](https://sociabuzz.com/kuncung38/tribe)
* **Indonesia (QRIS / GoPay / OVO / DANA):** [Saweria](https://saweria.co/kuncung38)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Game assets and original dialogue remain the intellectual property of their respective creators.
