const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    fullscreenable: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize();

  mainWindow.loadFile('app/pages/index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  return result.filePaths[0];
});

ipcMain.handle('add-headers', async (event, directoryPath, header, fileTypes) => {
  const addHeaderToFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith(header)) {
      const headerAdded = `${header}\n${content}`;
      fs.writeFileSync(filePath, headerAdded, 'utf8');
    }
  };

  const processDirectory = (directoryPath) => {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        processDirectory(filePath);
      } else if (fileTypes.includes(path.extname(file))) {
        addHeaderToFile(filePath);
      }
    });
  };

  processDirectory(directoryPath);
});

ipcMain.handle('remove-headers', async (event, directoryPath, header, fileTypes) => {
  const removeHeaderFromFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.startsWith(header)) {
      const headerRemoved = content.slice(header.length).trimStart();
      fs.writeFileSync(filePath, headerRemoved, 'utf8');
    }
  };

  const processDirectory = (directoryPath) => {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        processDirectory(filePath);
      } else if (fileTypes.includes(path.extname(file))) {
        removeHeaderFromFile(filePath);
      }
    });
  };

  processDirectory(directoryPath);
});
