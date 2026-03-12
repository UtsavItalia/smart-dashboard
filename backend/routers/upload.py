from fastapi import File, UploadFile, APIRouter, HTTPException
from services.data_processor import save_and_load_csv, get_preview

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File type must be .csv")
    try:
        file_bytes = await file.read()
        df = save_and_load_csv(file_bytes, file.filename)
        preview_data = get_preview(df)

        return {
            "success": True,
            "filename": file.filename,
            "data": preview_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
