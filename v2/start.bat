@echo off
set SCRIPT_DIR=%~dp0
set SCRIPT_DIR=%SCRIPT_DIR:\=/%
set SCRIPT_DIR=%SCRIPT_DIR::=%
start "La Cabane de Hjort - Deploy" "C:\Program Files\Git\bin\bash.exe" -l -c "cd '/%SCRIPT_DIR%' && bash scripts/build-deploy.sh; read -p 'Appuie sur Entree pour fermer...'"
