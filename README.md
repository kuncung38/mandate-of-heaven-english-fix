# Mandate of Heaven (江山北望) — Complete English Fix Mod

[![Game Version](https://img.shields.io/badge/Game%20Version-v2.0.2-blue.svg)](https://store.steampowered.com/app/3831120/)
[![Mod Version](https://img.shields.io/badge/Mod%20Version-v2.0.2-brightgreen.svg)](https://github.com/kuncung38/mandate-of-heaven-english-fix/releases)
[![Steam App ID](https://img.shields.io/badge/Steam%20App%20ID-3831120-orange.svg)](https://store.steampowered.com/app/3831120/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive, zero-overhead localization and engine fix mod for ***Mandate of Heaven*** (《江山北望》), resolving all major English release bugs, untranslated Chinese overlays, broken choice engines, and unreadable subtitles.

---

## 🎮 What This Mod Fixes

### 1. 🔤 Boot Directly into English (No More Mandarin/Japanese Menus)
* **Official Bug:** The game booted by default into Chinese (`zh-cmn-Hans`). Worse, the developer's English dictionary had Japanese placeholder strings (`"設定"`, `"物語を始める"`), causing English mode to display Asian characters.
* **Our Fix:** The game launches directly into clean, polished English across all main menus, pause menus, settings, and flowchart screens.

### 2. ⚡ In-Game Choices Language Bug (Choices Locked in Chinese)
* **Official Bug:** When a save was created, the engine hardcoded `language: "zh_CN"` in the save snapshot. During gameplay, `locale(e)` queried the save's creation language, locking choice buttons to Chinese even if you selected English in settings or skipped videos.
* **Our Fix:** The choice engine dynamically tracks the active Vue UI locale. All choices now display in English at all times, including on existing saves and after video skips.

### 3. 📜 33 Character Dossier Video Popups Localized
* **Official Bug:** In the official release, character dossiers that pop up during video playback were hardcoded in raw Chinese.
* **Our Fix:** All 33 character intros (Consort Xie Ruolan, Chu Huan, Chancellor Chen Dao, Prince Sikong Zheng, General Zu Kun, Cao Biaozhi, Empress Dowager Li, etc.) are fully localized into immersive English.

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

### 7. 🎯 QTE Prompts & Guide Dialogs
* `"点击"` $\rightarrow$ **"Tap"**
* `"长按"` $\rightarrow$ **"Hold"**
* Spoiler hint buttons localized: **"Try Again"**, **"View Guide"**, **"Close Hint"**

---

## 🚀 Installation

### Option A: 1-Click Installer (Recommended)
1. Download `English_Fix_Mod.zip` from the [Releases](https://github.com/kuncung38/mandate-of-heaven-english-fix/releases) tab.
2. Extract the archive directly into your game directory:
   ```
   Steam\steamapps\common\江山北望\
   ```
3. Run `install.bat`. It will automatically back up your original files and apply the mod.
4. Launch the game from Steam and enjoy!

### Option B: Manual Installation
1. Copy the 8 `chapter*_en.pack` files into your game root directory:
   ```
   Steam\steamapps\common\江山北望\
   ```
2. Copy `resources\app.asar` into:
   ```
   Steam\steamapps\common\江山北望\resources\
   ```

---

## 🔄 Uninstallation

Double-click `uninstall.bat` inside your game folder to restore all `.original` backup files, or verify file integrity via Steam:
* Steam Library $\rightarrow$ Right Click **Mandate of Heaven** $\rightarrow$ **Properties** $\rightarrow$ **Installed Files** $\rightarrow$ **"Verify integrity of game files"**.

---

## ⚡ Performance Impact

| Metric | Measured Impact | Notes |
| :--- | :---: | :--- |
| **CPU Usage** | **+0.0%** | Native $O(1)$ dictionary lookups; zero loops or background polling. |
| **GPU Usage** | **+0.0%** | Hardware video decoding unchanged; lightweight CSS backdrop. |
| **RAM Usage** | **~0.0%** (or -1%) | Native system fonts reduce font cache overhead compared to heavy CJK OTF fonts. |
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

## 📜 License

This project is licensed under the [MIT License](LICENSE). Game assets and original dialogue remain the intellectual property of their respective creators.
