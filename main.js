const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

function createWindow() {
  const width = 300;
  const height = 300;
  const { width: screenW, height: screenH } =
    screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    x: screenW - width - 10,
    y: screenH - height - 10,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    titleBarStyle: "hidden",
    type: "toolbar",
    show: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "src/index.html"));
  win.on("blur", () => {
    setTimeout(() => {
      if (!win.isDestroyed()) {
        win.setBounds(win.getBounds()); 
      }
    }, 100);
  });

  win.once("ready-to-show", () => {
    win.show();
  });
  win.setTitle("");
}

app.whenReady().then(createWindow);
