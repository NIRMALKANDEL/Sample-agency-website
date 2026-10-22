@echo off
rem Installs dependencies and runs type checks, lint and a production build.
rem Output is written to verify-log.txt in the project folder.
cd /d "%~dp0.."
set LOG=verify-log.txt
echo === node === > %LOG%
node -v >> %LOG% 2>&1
call npm -v >> %LOG% 2>&1
echo === install === >> %LOG%
call npm install --no-audit --no-fund >> %LOG% 2>&1
echo === typecheck === >> %LOG%
call npm run typecheck >> %LOG% 2>&1
echo === lint === >> %LOG%
call npm run lint >> %LOG% 2>&1
echo === build === >> %LOG%
call npm run build >> %LOG% 2>&1
echo === DONE === >> %LOG%
