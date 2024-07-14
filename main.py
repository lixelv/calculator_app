from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/src", StaticFiles(directory="src"), name="src")


@app.get("/", response_class=HTMLResponse)
async def index():
    with open("src/index.html") as f:
        return HTMLResponse(content=f.read())
    
@app.get("/favicon.ico")
async def favicon():
    return FileResponse("src/assets/icon.ico")