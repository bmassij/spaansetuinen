    $staging = Join-Path $PSScriptRoot "vision-tools_staging"
$dest = "C:\vision-tools"

Write-Host "Creating destination folders..."
New-Item -ItemType Directory -Path $dest -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $dest "florence") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $dest "output") -Force | Out-Null

Write-Host "Copying files..."
Copy-Item -Path (Join-Path $PSScriptRoot "vision-tools_staging\florence\classify_images.py") -Destination (Join-Path $dest "florence\classify_images.py") -Force
Copy-Item -Path (Join-Path $PSScriptRoot "vision-tools_staging\requirements.txt") -Destination (Join-Path $dest "requirements.txt") -Force
Copy-Item -Path (Join-Path $PSScriptRoot "vision-tools_staging\run_florence.bat") -Destination (Join-Path $dest "run_florence.bat") -Force
Copy-Item -Path (Join-Path $PSScriptRoot "vision-tools_staging\setup_vision_tools.bat") -Destination (Join-Path $dest "setup_vision_tools.bat") -Force

Write-Host "Creating venv... (this may take a while)"
python -m venv (Join-Path $dest "venv")

Write-Host "Done. Next steps: activate venv, install deps and set HF token. See README below."

$readme = @"
To finalize setup:
1) Open PowerShell and run:
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   & 'C:\vision-tools\venv\Scripts\Activate.ps1'
2) pip install --upgrade pip
3) pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
4) pip install -r C:\vision-tools\requirements.txt
5) setx HUGGINGFACEHUB_API_TOKEN "YOUR_TOKEN"
6) Run: C:\vision-tools\run_florence.bat
"@

$readme | Out-File -FilePath (Join-Path $dest "README_SETUP.txt") -Encoding utf8
Write-Host "README written to C:\vision-tools\README_SETUP.txt"
