import { BrowserWindow, dialog, app } from "electron";
const path = require("path");



class WindowManagerFactory {

    constructor() { }

    static GetInstance() {
        if (!WindowManagerFactory.instance) {
            this.mainWindow;
            this.splashWindow;
            WindowManagerFactory.instance = new WindowManagerFactory();
        }

        return WindowManagerFactory.instance;
    }

    async CreateWindows() {
        await this.CreateMainWindow()
    }

    async CreateMainWindow() {
        if (this.mainWindow) { return; }

        this.mainWindow = new BrowserWindow({
            width: 1450,
            height: 950,
            // icon: this.GetIconPath(),
            show: true,
            webPreferences: {
                nodeIntegration: true, //process.env.ELECTRON_NODE_INTEGRATION,
                contextIsolation: true, //!process.env.ELECTRON_NODE_INTEGRATION,
                enableRemoteModule: true,
                // nodeIntegrationInWorker: false,
                webSecurity: false,
                preload: path.join(__dirname, 'preload.js')
            },
        })

        // set main menu to null (set later) 
        this.mainWindow.setMenu(null)

        // event on the main window
        this.mainWindow.webContents.on("did-finish-load", () => {
            if (this.splashWindow) {
                this.splashWindow.close();
            }
            this.mainWindow.show(true);
        });

        this.mainWindow.webContents.on("page-title-updated", e => {
            e.preventDefault();
            this.mainWindow.setTitle(this.GetAppName());
            this.mainWindow.setIcon(this.GetIconPath());
        });

        this.mainWindow.on("closed", () => (this.mainWindow = null));

        this.mainWindow.on("close", e => {
            const userCloseChoice = this.ShowCloseChoices();
            if (userCloseChoice === 0) {
                if (this.sideWindow) this.sideWindow.close();
                if (this.splashWindow) this.splashWindow.close();
                if (this.infoWindow) this.infoWindow.close();
            } else {
                e.preventDefault();
            }
        });

        // serve the app.
        try {
            if (process.env.WEBPACK_DEV_SERVER_URL) {
                // Load the url of the dev server if in development mode
                await this.mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
                if (!process.env.IS_TEST) this.mainWindow.webContents.openDevTools();
            } else {
                // Load the index.html when not in development
                this.mainWindow.loadURL("app://./index.html");
            }
        } catch (e) {
            console.error(e);
        }
    }

    CreateSplashWindow() {
        if (this.splashWindow) { return;  }

        this.splashWindow = new BrowserWindow({
            // parent: this.mainWindow,
            setAlwaysOnTop: true,
            width: 720,
            height: 300,
            icon: this.GetIconPath(),
            title: this.GetAppName(),
            show: true,
            skipTaskbar: true,
            frame: false,
            center: true,
            transparent: true,
        });

        this.splashWindow.loadFile(
            path.join(__static, "/splash/splash.html")
        );

        this.splashWindow.setAlwaysOnTop(true);

        this.splashWindow.on("closed", () => (this.splashWindow = null));
    }


    GetIconPath() {
        return path.join(__static, "icons/icon.jpg");
    }

    GetAppName() {
        return `Student Portal - v${app.getVersion()}`;
    }

    ShowCloseChoices() {
        return dialog.showMessageBoxSync(this.mainWindow, {
            type: "question",
            buttons: ["Yes", "No"],
            title: "Warning",
            message: "Do you really want to close the Student Portal?",
        });
    }
}

export default WindowManagerFactory;
