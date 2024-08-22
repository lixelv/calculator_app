from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    with open("src/index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(f.read())


@app.get("/og")
async def og():
    return FileResponse("src/assets/logo-512 — копия.png")

@app.get("/sw.js")
async def service_worker():
    return FileResponse("src/sw.js", media_type="application/javascript", headers={
        "Cache-Control": "public, max-age=0, must-revalidate"
    })

@app.get("/manifest.json")
async def manifest():
    return FileResponse("src/manifest.json", media_type="application/json", headers={
        "Cache-Control": "no-cache, no-store, must-revalidate"
    })

@app.get("/favicon.ico")
async def favicon():
    return FileResponse("src/assets/logo-512.png")

app.mount("/assets", StaticFiles(directory="src/assets"), name="assets")
app.mount("/src", StaticFiles(directory="src"), name="src")