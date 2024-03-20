import { app, shell, BrowserWindow, ipcMain, screen, Tray, globalShortcut, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import trayIcon from './icon16.png?asset';
import yearlyIcon from './yearly-icon.png?asset';

let tray: Tray;
function createWindow(): void {
  // Create the browser window.
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
      devTools: process.env?.NODE_ENV ===  'development' ? true : false,
    }
  })
  mainWindow.on('ready-to-show', () => {
    // app.
    mainWindow.show()
  })

  let isMaximizable = false;

  mainWindow.on('enter-full-screen', () => {
    const { width, height } = screen.getPrimaryDisplay().size
    mainWindow.setMaximumSize(width, height)
    isMaximizable = true
    globalShortcut.register('Escape', () => {
      isMaximizable ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true);
    })
  })

  // win.setVisibleOnAllWorkspaces(true); // put the window on all screens
  // win.focus(); // focus the window up front on the active screen
  // win.setVisibleOnAllWorkspaces(false); // disable all screen behavior

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.focus()
  // if (process.platform === 'darwin') {
  //   app.dock.hide();
  // }

  mainWindow.on('leave-full-screen', () => {
    mainWindow.setMaximumSize(740, 780)
    isMaximizable = false
    globalShortcut.unregister('Escape')
  })

  const handleShowApp = () => {
    if (mainWindow.isVisible() && mainWindow.isFocused()) {
      mainWindow.hide()
    }
    else if (mainWindow.isVisible() && !mainWindow.isFocused()) {
      mainWindow.focus()
    }
    else if (!mainWindow.isVisible()) {
      mainWindow.show()
    }
  }

  globalShortcut.register('CommandOrControl+Shift+J', handleShowApp);

  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+,', () => {
      if (mainWindow.isVisible() && mainWindow.isFocused()) {
        mainWindow.webContents.send('is-show-settings', true);
      }
    });
  })

  mainWindow.on('blur', () => {
    globalShortcut.unregister('CommandOrControl+,');
  })
  mainWindow.on('page-title-updated', function(e) {
    e.preventDefault()
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then(() => mainWindow.setTitle('gzi'))
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then(() => mainWindow.setTitle('gzi'))
  }
  // app.setLoginItemSettings({
  //   openAsHidden: true
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const nativeYearlyIcon = nativeImage.createFromPath(yearlyIcon);


// app.addListener('browser-window-blur', (e) => {
//   console.log(screen.getPrimaryDisplay())
//   console.log(e)
// })
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // electronApp.setAutoLaunch(true);

  app.dock.setIcon(nativeYearlyIcon);
  // if (process.platform === 'darwin') {
  //   app.dock.hide();
  // }

  const icon = nativeImage.createFromPath(trayIcon)
  tray = new Tray(icon)
  // setTimeout(() => {
  //   app.dock.hide();
  //   app.focus();
  //   console.log(123123)
  // },1100);

  // tray.addListener('click', () => {
  //   console.log('isHidden', app.isHidden())
  //   if (app.isHidden()) {
  //     app.show();
  //     app.focus();
  //   } else {
  //     app.hide();
  //   }
  //   // if (!app.isHidden()) {
  //   //   app.hide()
  //   // }
  // })

  console.log(app.getName())
  const contextMenu = Menu.buildFromTemplate([
    // { label: 'Item1', type: 'radio' },
    // { label: 'Item2', type: 'radio' },
    // { label: 'Item3', type: 'radio' },
    { label: 'Quit', type: 'normal', click: () => app.quit() }
  ])
  tray.setToolTip('gzi')
  tray.setContextMenu(contextMenu)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)

  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()

  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
