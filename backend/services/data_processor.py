import pandas as pd
import numpy as np
import os
import io
from services.config import UPLOAD_DIR

os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_and_load_csv(file_bytes: bytes, filename: str) -> pd.DataFrame:
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(file_bytes)

    df = pd.read_csv(io.BytesIO(file_bytes))
    return df

def get_preview(df: pd.DataFrame) -> dict:
    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "column_names": df.columns.tolist(),
        "dtypes": df.dtypes.astype(str).to_dict(),
        "preview": df.head(5).to_dict(orient="records") #orient="records" for {"age": {0: 25, 1: 30}} => [{"age": 25}, {"age": 30}]
    }

def get_summary_stats(df: pd.DataFrame) -> dict:
    numeric_df = df.select_dtypes(include=[np.number])
    stats = numeric_df.describe()

    result = {}
    for col in stats.columns:
        result[col] = {
            "count": round(stats[col]["count"], 2),
            "mean":  round(stats[col]["mean"], 2),
            "std":   round(stats[col]["std"], 2),
            "min":   round(stats[col]["min"], 2),
            "25%":   round(stats[col]["25%"], 2),
            "50%":   round(stats[col]["50%"], 2),
            "75%":   round(stats[col]["75%"], 2),
            "max":   round(stats[col]["max"], 2),
        }
    return result


def get_correlation_matrix(df:pd.DataFrame) -> dict:
    numeric_df = df.select_dtypes(include=[np.number])
    corr_matrix = numeric_df.corr()
    corr_matrix = corr_matrix.where(pd.notna(corr_matrix), other=np.nan)

    return corr_matrix.to_dict()

