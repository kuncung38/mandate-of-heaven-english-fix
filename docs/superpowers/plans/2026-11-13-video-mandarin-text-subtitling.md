# Comprehensive Video Mandarin Text Subtitling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conduct an exhaustive chapter-by-chapter visual audit of all 481 non-loop cinematic videos across Chapters 0–7 in *Mandate of Heaven* (《江山北望》), transcribe and translate all burned-in Chinese narration cards and live-action white serif text overlays, create millisecond-synchronized English WebVTT subtitles, repack the affected chapter packs, and deploy update release `v2.0.4.0`.

**Architecture:**
- Headless Microsoft Edge browser via Chrome DevTools Protocol (CDP) and local HTTP range-streaming server to seek and extract canvas video frames at scene transitions, subtitle silence gaps, and video endpoints across all 8 chapters.
- Two-tier computer vision detector: (a) Golden calligraphy on dark parchment texture cards; (b) White Mingti/Songti (`宋体`) text with drop shadow overlaid on live-action footage.
- Accurate transcription of Chinese characters from captured frames, followed by translation into high-register, period-appropriate historical English.
- Exact millisecond synchronization formatted into WebVTT cues, validated for non-collision with dialogue ($\ge 80\text{ ms}$ silence buffer).
- Asar packaging preserving native unpack paths (`@dsh0416/steamworks.js`, `tapsdk-pc`), synchronizing both live game and mod distribution directories.

**Tech Stack:**
- Electron 2.0.2 / Vue 3 / Node.js
- Headless Microsoft Edge / CDP (WebSocket / Canvas 2D)
- Asar archive CLI & API
- WebVTT Subtitle Specification
- Git / GitHub Releases (`mandate-of-heaven-english-fix`)

## Global Constraints
- Target App: Steam App ID `3831120`, *Mandate of Heaven* (`江山北望`) at `E:\SteamLibrary\steamapps\common\江山北望`.
- Subtitle cues must NEVER overlap with existing spoken dialogue cues; maintain at least an 80 ms silence safety margin.
- Subtitle styling must match the established English mod format (two-line breaks for narrative clauses where appropriate, natural punctuation).
- Native unpacking flags (`--unpack-dir`) must be preserved for `@dsh0416/steamworks.js` and `tapsdk-pc` during all ASAR repacking operations.
- Mod package must be maintained in sync across the live game, `English_Fix_Mod/`, and the GitHub repository `mandate-of-heaven-english-fix`.

---

### Task 1: Comprehensive Visual Scan & Candidate Extraction (Chapters 0–7)

**Files:**
- Create: `C:/Users/user/.gemini/antigravity/brain/6c8f5a3f-e067-49b5-bfab-092c166fce3c/scratch/scan_all_chapters.cjs`
- Output: `C:/Users/user/.gemini/antigravity/brain/6c8f5a3f-e067-49b5-bfab-092c166fce3c/scratch/text_card_candidates/`

**Interfaces:**
- Consumes: `chapter0_neutral.pack` through `chapter7_neutral.pack`
- Produces: Visual JPEG snapshots of every detected text card candidate, indexed by video name and timestamp.

- [ ] **Step 1: Write and run the chapter scanning harness**
  Automate frame sampling across all 481 non-loop videos for all 8 chapters:
  - Check timestamps at scene start ($t \in [0.5, 4.5]\text{s}$), midpoint, silence gaps between dialogue cues, and scene endpoints ($t \in [\text{duration} - 3.5, \text{duration} - 0.5]\text{s}$).
  - Detect high luminance text clusters and horizontal line regularity in lower half of screen ($y \in [35\%, 75\%]$).
  - Save candidate frames to `scratch/text_card_candidates/cand_ch<C>_<video>_t<time>s.jpg`.

- [ ] **Step 2: Inspect and catalog all discovered text cards**
  - Manually review all captured candidate frames to eliminate false positives (e.g. bright clothing, sunlight rays, torches).
  - Compile the definitive catalog of all on-screen Chinese text events, noting: Chapter, Video ID, Chinese Transcription, and Scene Context.

---

### Task 2: Transcription, Translation, and Millisecond Timing Synchronization

**Files:**
- Create: `C:/Users/user/.gemini/antigravity/brain/6c8f5a3f-e067-49b5-bfab-092c166fce3c/scratch/measure_new_text_cards.cjs`
- Modify: Subtitle VTT files in `scratch/subtitles/chapter{0..7}/subtitles/` and `mandate-of-heaven-english-fix/subtitles/chapter{0..7}/`

**Interfaces:**
- Consumes: Catalog of verified text cards and raw video streams
- Produces: Precise start timestamp ($t_{\text{in}}$) and end timestamp ($t_{\text{out}}$) for each card, along with professional English translations.

- [ ] **Step 1: Measure exact millisecond start and end of text card visibility**
  - Sample video around candidate timestamps at $0.1\text{s}$ resolution to detect text fade-in ($t_{\text{in}}$) and fade-out ($t_{\text{out}}$).
  - Clamp cue boundaries to prevent overlapping with adjacent dialogue cues ($\ge 80\text{ ms}$ separation).

- [ ] **Step 2: Translate Chinese narration into period-accurate English**
  - Translate all transcribed cards with literary grace matching the historical drama setting of the game.
  - Examples:
    - `三日后，伴随着楚桓认罪的庭审结果，你得以从谋反一事中洗清嫌疑。` $\to$
      `Three days later, following the verdict of Chu Huan's confession at trial, you were cleared of all suspicion regarding the rebellion.`

- [ ] **Step 3: Inject cues into corresponding WebVTT files**
  - Insert formatted cues chronologically into target `.vtt` files.
  - If a video currently has no VTT file (zero cues originally), create a new `.vtt` file with `WEBVTT` header and the narrative cue.

---

### Task 3: Pack Building, Collision Verification, and Deployment

**Files:**
- Create: `C:/Users/user/.gemini/antigravity/brain/6c8f5a3f-e067-49b5-bfab-092c166fce3c/scratch/apply_and_repack_v2040.cjs`
- Modify: `E:/SteamLibrary/steamapps/common/江山北望/chapter*_en.pack`
- Modify: `E:/SteamLibrary/steamapps/common/江山北望/English_Fix_Mod/chapter*_en.pack`
- Modify: `E:/SteamLibrary/steamapps/common/江山北望/English_Fix_Mod.zip`

**Interfaces:**
- Consumes: Updated VTT files in repository and scratch
- Produces: Repacked ASAR packages for all affected chapters and updated mod distribution zip.

- [ ] **Step 1: Run automated collision and syntax verification**
  - Parse every VTT file in the project.
  - Verify start < end for all cues, strictly monotonically increasing timestamps, zero overlapping time spans, and valid WebVTT headers.

- [ ] **Step 2: Repack affected chapter ASAR archives**
  - Repack updated `chapter*_en.pack` files using asar CLI.
  - Copy repacked files to both live game directory and `English_Fix_Mod/`.

- [ ] **Step 3: Rebuild distribution zip `English_Fix_Mod.zip`**
  - Update `English_Fix_Mod.zip` with the newly repacked chapter packages.

---

### Task 4: Repository Synchronization, Git Commit, and Release Publication

**Files:**
- Modify: `E:/SteamLibrary/steamapps/common/江山北望/mandate-of-heaven-english-fix/` (git repository)

**Interfaces:**
- Consumes: Updated VTT files and release package
- Produces: Git commit, git tag `v2.0.4.0`, pushed to GitHub `origin/main`, and GitHub release with attached `English_Fix_Mod.zip`.

- [ ] **Step 1: Stage and commit subtitle updates to Git repository**
  - `git add subtitles/`
  - `git commit -m "feat: localize on-screen Chinese video text overlays and narration cards"`
  - `git push origin main`

- [ ] **Step 2: Publish GitHub release `v2.0.4.0`**
  - Create release notes detailing all newly subtitled narrative cards and scenes.
  - Upload `English_Fix_Mod.zip` to the release assets.
