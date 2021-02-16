'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import axios from 'axios';
import FormData from 'form-data';
import { ipcMain } from 'electron';

const { download } = require('electron-dl');
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require("fs");

let win;

ipcMain.on('upload', async (event, url, file, email, epubName, path) => {
  console.log(`${file} 업로드 중`)
  const f = new FormData();
  f.append('file', fs.createReadStream(file));
  f.append('email', email);
  f.append('epubName', epubName);
  f.append('path', path);
  const config = {
    headers: f.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  }
  await axios.post(url, f, config)
    .then(function () {
      console.log('upload success')
      win.webContents.send('upload','success');
    })
    .catch(function (err) {
      console.log(file, '에러에러에러')
      win.webContents.send('upload', 'fail');
    })
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true }}
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 950,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('download-button', async (event, url, ebookPath, filePath) => {
  const options = {
    directory: ebookPath + filePath,
  }
  const win = BrowserWindow.getFocusedWindow();
  await download(win, url, options);
});