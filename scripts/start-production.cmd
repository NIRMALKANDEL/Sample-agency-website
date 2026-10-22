@echo off
rem Serves the production build at http://localhost:3000 (run verify.cmd first).
cd /d "%~dp0.."
call npm run start
