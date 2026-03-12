from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import os
from services.ai_service import generate_insights
from services.config import UPLOAD_DIR
from services.data_processor import get_summary_stats, get_correlation_matrix

router = APIRouter(prefix="/insights", tags=["Insights"])

class AnalysisReport(BaseModel):
    filename: str

@router.post("/")
def get_insights(request: AnalysisReport):
    filepath = os.path.join(UPLOAD_DIR, request.filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail=f"{request.filename} not found. Please upload it first.")

    try:
        df = pd.read_csv(filepath)
        stats = get_summary_stats(df)
        correlation = get_correlation_matrix(df)
        insights = generate_insights(request.filename, stats, correlation)

        return {
            "status": 200,
            "filename": request.filename,
            "insights": insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
