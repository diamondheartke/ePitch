@echo off
setlocal enabledelayedexpansion
title ePitch - Tactical Arena (Django Server)

echo =====================================================================
echo              ePITCH - TACTICAL FOOTBALL ARENA
echo            Django Architecture Environment Setup
echo =====================================================================
echo.

:: 1. Verify Python installation
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not added to PATH.
    echo Please download and install Python from https://www.python.org/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version') do set PYTHON_VER=%%i
echo [INFO] Detected: %PYTHON_VER%
echo.

:: 2. Check and prepare virtual environment
if not exist "venv\Scripts\activate.bat" (
    echo [1/4] Virtual environment not found. Creating 'venv'...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create virtual environment.
        pause
        exit /b 1
    )
    echo [INFO] Virtual environment created successfully.
) else (
    echo [1/4] Virtual environment 'venv' found.
)
echo.

:: 3. Activate virtual environment
echo [2/4] Activating virtual environment...
call venv\Scripts\activate.bat
echo.

:: 4. Install dependencies if not found
echo [3/4] Verifying and installing Python dependencies...
python -m pip install --upgrade pip >nul 2>&1

if exist "requirements.txt" (
    echo Installing packages from requirements.txt...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo [WARNING] Some optional C-extensions (like mysqlclient) may require Visual C++ Build Tools.
        echo Falling back to core packages (django, requests, pillow, pymysql)...
        pip install django pillow requests python-dotenv pymysql
    )
) else (
    echo [WARNING] requirements.txt not found. Installing base django package...
    pip install django
)
echo.

:: 5. Run Django database migrations
echo [4/4] Applying database migrations...
python manage.py migrate --noinput
echo.

:: 6. Launch web app and open browser
echo =====================================================================
echo  [SUCCESS] ePitch is ready!
echo  Starting server at: http://127.0.0.1:8000/
echo  Press CTRL+C to stop the server at any time.
echo =====================================================================
echo.

:: Open default browser
start http://127.0.0.1:8000/

:: Start Django development server
python manage.py runserver 0.0.0.0:8000

pause
