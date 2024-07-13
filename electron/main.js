const { app, BrowserWindow } = require("electron")
const remote = require("@electron/remote/main")

remote.initialize()

function createWindow() {
    const ratio = 1.5
    const height = 50
    const width = Math.ceil(height / ratio)

    return new BrowserWindow({
        width: width,
        height: height,
        frame: false, // Без рамок
        transparent: true, // Прозрачное
        alwaysOnTop: true, // Всегда поверх всех окон
        vibrancy: "dark",
        webPreferences: {
            // preload: path.join(__dirname, "script.js"),
            devTools: true,
            enableRemoteModule: true, // Включаем remote
            nodeIntegration: true, // Включаем интеграцию Node.js
            contextIsolation: false, // Отключаем изоляцию контекста
        },
    })
}

app.whenReady().then(() => {
    const win = createWindow()
    remote.enable(win.webContents)

    win.on("will-resize", (event) => {
        event.preventDefault()
    })
    win.setVibrancy("dark")
    win.loadFile("src/index.html")

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
})
