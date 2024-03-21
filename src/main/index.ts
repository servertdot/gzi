import { app, shell, BrowserWindow, screen, Tray, globalShortcut, Menu, nativeImage } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import trayIcon from './icon.png?asset';
import ico from '../../resources/icon-lg.png?asset';

let tray: Tray;
function createWindow(): void {
    if (process.platform === 'darwin') {
        app.dock.hide();
    }
    const mainWindow = new BrowserWindow({
        width: 406,
        height: 640,
        show: false,
        frame: false,
        minWidth: 406,
        minHeight: 640,
        maxWidth: 740,
        maxHeight: 780,
        alwaysOnTop: true,
        titleBarStyle: 'hidden',
        title: 'gzi',
        skipTaskbar: true,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { trayIcon } : {}),
        webPreferences: {
            sandbox: false,
            webviewTag: true,
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, '../preload/index.js'),
            devTools: process.env?.NODE_ENV === 'development'
        }
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    let isMaximizable = false;

    mainWindow.on('enter-full-screen', () => {
        const { width, height } = screen.getPrimaryDisplay().size;
        mainWindow.setMaximumSize(width, height);
        isMaximizable = true;
        globalShortcut.register('Escape', () => {
            isMaximizable ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true);
        });
    });

    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    mainWindow.focus();

    mainWindow.on('leave-full-screen', () => {
        mainWindow.setMaximumSize(740, 780);
        isMaximizable = false;
        globalShortcut.unregister('Escape');
    });

    const handleShowApp = () => {
        if (mainWindow.isVisible() && mainWindow.isFocused()) {
            mainWindow.hide();
        } else if (mainWindow.isVisible() && !mainWindow.isFocused()) {
            mainWindow.focus();
        } else if (!mainWindow.isVisible()) {
            mainWindow.show();
        }
    };

    globalShortcut.register('CommandOrControl+Shift+J', handleShowApp);

    mainWindow.on('focus', () => {
        globalShortcut.register('CommandOrControl+,', () => {
            if (mainWindow.isVisible() && mainWindow.isFocused()) {
                mainWindow.webContents.send('is-show-settings', true);
            }
        });
    });

    mainWindow.on('blur', () => {
        globalShortcut.unregister('CommandOrControl+,');
    });
    mainWindow.on('page-title-updated', function(e) {
        e.preventDefault();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url).catch(console.error);
        return { action: 'deny' };
    });

    if (is.dev && process.env.ELECTRON_RENDERER_URL) {
        mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL).then(() => { mainWindow.setTitle('gzi'); }).catch(console.error);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then(() => { mainWindow.setTitle('gzi'); }).catch(console.error);
    }
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron');

    const nativeYearlyIcon = nativeImage.createFromPath(ico as string);
    app.dock.setIcon(nativeYearlyIcon);

    const icon = nativeImage.createFromPath(trayIcon as string);
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', type: 'normal', click: () => { app.quit(); } }
    ]);
    tray.setToolTip('gzi');
    tray.setContextMenu(contextMenu);

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
}).catch(console.error);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
