
@echo off
REM Internet Infrastructure Explorer - ZIP Creation Script for Windows
REM This script creates a ZIP archive of the project, excluding unnecessary files

setlocal enabledelayedexpansion

REM Output file name
set ZIP_NAME=internet-infrastructure-explorer.zip

REM Get the project root directory
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..
cd %PROJECT_ROOT% || (echo Failed to navigate to project root & exit /b 1)

echo Creating ZIP archive of Internet Infrastructure Explorer...
echo Working directory: %CD%

REM Check if PowerShell is available
where powershell >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: PowerShell is not available.
    echo This script requires PowerShell to create the ZIP archive.
    echo Please install PowerShell or use the manual ZIP creation method.
    exit /b 1
)

echo Using PowerShell to create the ZIP archive...

REM Create the ZIP file using PowerShell
powershell -Command ^
    "$compress = @{ ^
        Path = Get-ChildItem -Path . -Exclude 'node_modules', '.git', 'dist', 'build', '.vscode', '.idea', '*.log', '%ZIP_NAME%' -Recurse ^
        | Where-Object { ^
            -not ($_.FullName -like '*\node_modules\*' -or ^
                  $_.FullName -like '*\.git\*' -or ^
                  $_.FullName -like '*\dist\*' -or ^
                  $_.FullName -like '*\build\*' -or ^
                  $_.FullName -like '*\.vscode\*' -or ^
                  $_.FullName -like '*\.idea\*' -or ^
                  $_.FullName -like '*\npm-debug.log*' -or ^
                  $_.FullName -like '*\yarn-debug.log*' -or ^
                  $_.FullName -like '*\yarn-error.log*' -or ^
                  $_.Name -eq '.DS_Store' -or ^
                  $_.Name -like '.env*' -or ^
                  $_.Name -eq '%ZIP_NAME%') ^
        }; ^
        DestinationPath = '%CD%\%ZIP_NAME%'; ^
        CompressionLevel = 'Optimal' ^
    }; ^
    Write-Host 'Creating ZIP archive...'; ^
    Compress-Archive @compress -Force; ^
    if ($?) { ^
        $fileSize = (Get-Item '%CD%\%ZIP_NAME%').Length / 1MB; ^
        Write-Host ('Success! Created %ZIP_NAME% ({0:N2} MB)' -f $fileSize); ^
        Write-Host ('Location: %CD%\%ZIP_NAME%'); ^
    } else { ^
        Write-Host 'Error: Failed to create ZIP archive.' -ForegroundColor Red; ^
        exit 1; ^
    }"

if %ERRORLEVEL% equ 0 (
    echo.
    echo Next steps:
    echo 1. Upload this ZIP file to your preferred hosting service
    echo 2. Share the download link with users
    echo 3. Users can follow the instructions in GITHUB_IMPLEMENTATION.md to set up the project
) else (
    echo Error: Failed to create ZIP archive.
    exit /b 1
)

endlocal
