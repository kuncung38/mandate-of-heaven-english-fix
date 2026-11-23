#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  Mandate of Heaven (江山北望) - Complete English Fix Mod"
echo "  Cross-Platform Installer (Linux & macOS)"
echo "========================================================"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$SCRIPT_DIR"

# Check standard Linux/Steam layout
if [ -f "$TARGET_DIR/resources/app.asar" ]; then
    TARGET_RES="$TARGET_DIR/resources"
elif [ -f "$SCRIPT_DIR/../resources/app.asar" ]; then
    TARGET_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
    TARGET_RES="$TARGET_DIR/resources"
# Check macOS app bundle layout
elif [ -d "$TARGET_DIR/江山北望.app/Contents/Resources" ]; then
    TARGET_RES="$TARGET_DIR/江山北望.app/Contents/Resources"
elif [ -d "$SCRIPT_DIR/../江山北望.app/Contents/Resources" ]; then
    TARGET_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
    TARGET_RES="$TARGET_DIR/江山北望.app/Contents/Resources"
elif [ -d "$SCRIPT_DIR/../Contents/Resources" ]; then
    TARGET_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
    TARGET_RES="$(cd "$SCRIPT_DIR/../Contents/Resources" && pwd)"
else
    echo "[ERROR] Could not locate game directory."
    echo "Please ensure this mod folder is placed inside your Steam game directory:"
    echo "  Linux:   ~/.steam/steam/steamapps/common/江山北望/"
    echo "  macOS:   ~/Library/Application Support/Steam/steamapps/common/江山北望/"
    exit 1
fi

echo "Game detected at: $TARGET_DIR"
echo "Resources path:   $TARGET_RES"
echo ""

echo "1. Backing up original files (if not already backed up)..."
if [ -f "$TARGET_RES/app.asar" ] && [ ! -f "$TARGET_RES/app.asar.original" ]; then
    cp "$TARGET_RES/app.asar" "$TARGET_RES/app.asar.original"
    echo "  - Backed up app.asar -> app.asar.original"
fi

for i in {0..7}; do
    PACK="$TARGET_DIR/chapter${i}_en.pack"
    if [ ! -f "$PACK" ] && [ -f "$TARGET_RES/chapter${i}_en.pack" ]; then
        PACK="$TARGET_RES/chapter${i}_en.pack"
    fi
    if [ -f "$PACK" ] && [ ! -f "${PACK}.original" ]; then
        cp "$PACK" "${PACK}.original"
        echo "  - Backed up $(basename "$PACK")"
    fi
done

echo ""
echo "2. Installing patched English engine & native libraries..."
MOD_APP_ASAR=""
if [ -f "$SCRIPT_DIR/resources/app.asar" ]; then
    MOD_APP_ASAR="$SCRIPT_DIR/resources/app.asar"
elif [ -f "$SCRIPT_DIR/app.asar" ]; then
    MOD_APP_ASAR="$SCRIPT_DIR/app.asar"
fi

if [ -n "$MOD_APP_ASAR" ]; then
    cp -f "$MOD_APP_ASAR" "$TARGET_RES/app.asar"
    echo "  [OK] Installed patched app.asar"
fi

MOD_UNPACKED=""
if [ -d "$SCRIPT_DIR/resources/app.asar.unpacked" ]; then
    MOD_UNPACKED="$SCRIPT_DIR/resources/app.asar.unpacked"
fi

if [ -n "$MOD_UNPACKED" ]; then
    cp -rf "$MOD_UNPACKED" "$TARGET_RES/"
    echo "  [OK] Installed multi-platform native libraries (Linux & macOS)"
fi

echo ""
echo "3. Installing optimized English subtitle packs..."
for i in {0..7}; do
    SRC_PACK="$SCRIPT_DIR/chapter${i}_en.pack"
    if [ -f "$SRC_PACK" ]; then
        cp -f "$SRC_PACK" "$TARGET_DIR/"
        # For macOS if packs live inside Resources
        if [ -d "$TARGET_RES" ] && [ "$TARGET_RES" != "$TARGET_DIR/resources" ] && [ -f "$TARGET_RES/chapter${i}_en.pack.original" ]; then
            cp -f "$SRC_PACK" "$TARGET_RES/"
        fi
        echo "  [OK] Installed chapter${i}_en.pack"
    fi
done

echo ""
echo "========================================================"
echo "  Installation Complete!"
echo "  Launch the game directly from Steam."
echo "========================================================"
