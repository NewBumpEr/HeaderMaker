const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  addHeaders: (directory, header, fileTypes) => ipcRenderer.invoke('add-headers', directory, header, fileTypes),
  removeHeaders: (directory, header, fileTypes) => ipcRenderer.invoke('remove-headers', directory, header, fileTypes)
});
