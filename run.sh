cd frontend
npm start &
cd ..

cd backend
source activate base
conda activate findrey
uvicorn app.main:app --reload
cd ..

