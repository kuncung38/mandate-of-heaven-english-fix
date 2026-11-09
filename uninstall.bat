@echo off
chcp 65001 >nul
echo ========================================================
echo   Mandate of Heaven (江山北望) - Mod Uninstaller
echo ========================================================
echo.

if exist "%~dp0..\resources\app.asar" (
    cd /d "%~dp0.."
)

echo Restoring original backup files...

if exist "resources\app.asar.original" (
    copy /y "resources\app.asar.original" "resources\app.asar" >nul
    echo   [OK] Restored resources\app.asar
) else (
    echo   [INFO] No app.asar.original backup found.
)

for %%I in (0 1 2 3 4 5 6 7) do (
    if exist "chapter%%I_en.pack.original" (
        copy /y "chapter%%I_en.pack.original" "chapter%%I_en.pack" >nul
        echo   [OK] Restored chapter%%I_en.pack
    )
)

echo.
echo Original files restored.
pause
