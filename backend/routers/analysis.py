from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import os
from services.config import UPLOAD_DIR
from services.data_processor import get_summary_stats, get_correlation_matrix


router = APIRouter(prefix="/analysis", tags=["Analysis"])

class AnalysisReport(BaseModel):
    filename: str

def load_df(filename: str) -> pd.DataFrame:
    filepath = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail=f"{filename} not found. Please upload it first.")
    return pd.read_csv(filepath)

@router.post("/stats")
def summary_stats(request: AnalysisReport):
    df = load_df(request.filename)
    stats = get_summary_stats(df)
    return {
        "status": 200,
        "filename": request.filename,
        "stats": stats
    }

@router.post("/correlation")
def correlation(request: AnalysisReport):
    df = load_df(request.filename)
    correlation = get_correlation_matrix(df)
    return {
        "status": 200,
        "filename": request.filename,
        "correlation": correlation
    }
