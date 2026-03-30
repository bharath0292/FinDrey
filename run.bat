@REM @echo off
cd backend
start /B cmd /C "conda activate findrey && uvicorn app.main:app --port 5000 --reload"
cd ..

cd frontend
start npm start
cd ..