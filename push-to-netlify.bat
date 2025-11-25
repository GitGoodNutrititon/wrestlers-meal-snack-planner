@echo off
echo Checking Git Status...
git status

echo.
echo Adding all modified and untracked files...
git add -A

echo.
echo Committing changes...
git commit -m "Fix: Add Tooltip component and update dashboard styling"

echo.
echo Pushing to GitHub (which triggers Netlify)...
git push origin main

echo.
echo Done! Check Netlify in 2 minutes.
pause

