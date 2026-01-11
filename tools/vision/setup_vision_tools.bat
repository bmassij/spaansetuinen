@echo off
REM Maak doelmappen
mkdir C:\vision-tools
mkdir C:\vision-tools\florence
mkdir C:\vision-tools\output

REM Kopieer staging bestanden naar C:\vision-tools
xcopy /Y "%~dp0florence\classify_images.py" "C:\vision-tools\florence\"
copy /Y "%~dp0requirements.txt" "C:\vision-tools\requirements.txt"
copy /Y "%~dp0run_florence.bat" "C:\vision-tools\run_florence.bat"

REM Maak venv
python -m venv C:\vision-tools\venv
echo Virtual environment created at C:\vision-tools\venv

echo Setup complete. Next steps:
 echo 1) Activate venv: C:\vision-tools\venv\Scripts\activate
 echo 2) Install dependencies:
 echo    pip install --upgrade pip
 echo    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
 echo    pip install -r C:\vision-tools\requirements.txt
 echo 3) Set HF token: set HUGGINGFACEHUB_API_TOKEN=YOUR_TOKEN
 echo 4) Run: C:\vision-tools\run_florence.bat
pause
