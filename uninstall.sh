#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  Mandate of Heaven (江山北望) - Mod Uninstaller"
echo "  Cross-Platform (Linux & macOS)"
echo "========================================================"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$SCRIPT_DIR"

if [ -f "$TARGET_DIR/resources/app.asar" ]; then
    TARGET_RES="$TARGET_DIR/resources"
elif [ -f "$SCRIPT_DIR/../resources/app.asar" ]; then
    TARGET_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
    TARGET_RES="$TARGET_DIR/resources"
elif [ -d "$TARGET_DIR/江山北望.app/Contents/Resources" ]; then
    TARGET_RES="$TARGET_DIR/江山北望.app/Contents/Resources"
elif [ -d "$SCRIPT_DIR/../江山北望.app/Contents/Resources" ]; then
    TARGET_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
    TARGET_RES="$TARGET_DIR/江山北望.app/Contents/Resources"
fi

echo "Restoring original backup files..."

if [ -f "$TARGET_RES/app.asar.original" ]; then
    cp -f "$TARGET_RES/app.asar.original" "$TARGET_RES/app.asar"
    echo "  [OK] Restored app.asar"
else
    echo "  [INFO] No app.asar.original backup found."
fi

for i in {0..7}; do
    for dir in "$TARGET_DIR" "$TARGET_RES"; do
        if [ -f "$dir/chapter${i}_en.pack.original" ]; then
            cp -f "$dir/chapter${i}_en.pack.original" "$dir/chapter${i}_en.pack"
            echo "  [OK] Restored chapter${i}_en.pack in $(basename "$dir")"
        fi
    done
done

echo ""
echo "Original files restored."
