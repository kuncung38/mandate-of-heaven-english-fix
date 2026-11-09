@echo off
chcp 65001 >nul
echo ========================================================
echo   Mandate of Heaven (江山北望) - Complete English Fix Mod
echo ========================================================
echo.

set "TARGET_DIR=%~dp0"
if exist "%TARGET_DIR%resources\app.asar" (
    cd /d "%TARGET_DIR%"
) else if exist "%~dp0..\resources\app.asar" (
    cd /d "%~dp0.."
    set "TARGET_DIR=%CD%\"
)

echo Installing mod to: %CD%
echo.

if not exist "resources\app.asar" (
    echo [ERROR] Could not locate game directory.
    echo Please make sure this mod folder or files are inside your game folder:
    echo   ...\steamapps\common\江山北望\
    pause
    exit /b 1
)

echo 1. Backing up original files (if not already backed up)...
if not exist "resources\app.asar.original" (
    copy "resources\app.asar" "resources\app.asar.original" >nul
    echo   - Backed up resources\app.asar to resources\app.asar.original
)

for %%I in (0 1 2 3 4 5 6 7) do (
    if not exist "chapter%%I_en.pack.original" (
        if exist "chapter%%I_en.pack" (
            copy "chapter%%I_en.pack" "chapter%%I_en.pack.original" >nul
            echo   - Backed up chapter%%I_en.pack
        )
    )
)

echo.
echo 2. Installing patched English engine & video overlays...
copy /y "%~dp0resources\app.asar" "resources\app.asar" >nul
if %errorlevel% neq 0 (
    echo [ERROR] Failed to overwrite resources\app.asar. Is the game running?
    pause
    exit /b 1
)
echo   [OK] resources\app.asar installed successfully.

echo.
echo 3. Installing optimized English subtitle packs...
for %%I in (0 1 2 3 4 5 6 7) do (
    if exist "%~dp0chapter%%I_en.pack" (
        copy /y "%~dp0chapter%%I_en.pack" "chapter%%I_en.pack" >nul
        echo   [OK] Installed chapter%%I_en.pack
    )
)

echo.
echo ========================================================
echo   Installation Complete!
echo   Launch the game directly from Steam.
echo   Default language will be English.
echo ========================================================
pause
