from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import upload
from routers import analysis
from routers import insights

load_dotenv()

app = FastAPI(title="Smart Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(analysis.router)
app.include_router(insights.router)

@app.get("/")
def root():
    return {"status: Smart Dashboard API is running"}
