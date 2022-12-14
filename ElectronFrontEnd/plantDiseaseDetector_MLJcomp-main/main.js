
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const isDev = process.env.NODE_ENV === 'production';
const isMac = process.platform === 'darwin';
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

let mainWindow;

//Create main window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Plant disease Detector',
        width: isDev ? 1000 : 500,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    //Open Devtools
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}


//App is ready
app.whenReady().then(() => {
    createMainWindow();

    //Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

//Menu Template
const menu = [
    {
        role: 'fileMenu',
    }
];

// Respond to ipcRenderer detect
ipcMain.on('image:detect', (e, options) => {
    const imgPath = options.imgPath;
    const imgName = options.imgName;
    leaf_health = detectDisease(imgPath,imgName);
    // console.log(options)
});

//function to get result from server //COMMENT
async function detectDisease(path, name) {
    // console.log(path)
    try {
        const data = new FormData();
        data.append('image', fs.createReadStream(path));

        const res = await axios.post('http://127.0.0.1:80/uploadImage', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
        })
        //Send success to renderer
        mainWindow.webContents.send('image:done', res.data.diseased);
        return res.data.diseased;

    } catch (err) {
        console.log(err);
    }
}

// quit
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
});

//open window if none are open
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
