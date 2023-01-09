// Modules to control application life and create native browser window
const FileHelper = require("./src/FileHelper.js");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

ipcMain.handle("convertFile", async (event, data) => {
  console.log("mainjs: ");
  console.log(FileHelper.espToXml(data));
  const result = await FileHelper.espToXml(data);
  // console.log("result: " + result);
  return result;
});

ipcMain.handle("getItemsFromXml", async (event, data) => {
  const result = await FileHelper.getItemsFromXml(
    "./conversion/ConvertedFile.XML",
    "WEAP"
  );
  console.log(result);
  return result;
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
