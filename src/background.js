"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

import WindowManagerFactory from "@/backend/windows/win_manager"
const windowManagerFactory = WindowManagerFactory.GetInstance()

// ipc interfaces
import { DatabaseInterfaceChannel } from "@/backend/communication/ipc_database.js"

class CreateApp {
  constructor() {
    this.InitializeProtocols()
    this.InitializeCloseConditions()
    this.InitializeApp()

    this.InitializeIpcReception(
      [
        new DatabaseInterfaceChannel(),
      ]
    )
  }

  InitializeProtocols(){
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([
      { scheme: "app", privileges: { secure: true, standard: true } },
    ]);
  }

  InitializeCloseConditions(){
    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === "win32") {
        process.on("message", (data) => {
          if (data === "graceful-exit") {
            app.quit();
          }
        });
      } else {
        process.on("SIGTERM", () => {
          app.quit();
        });
      }
    }
  }

  InitializeApp() {

    app.on("window-all-closed", () => {
        app.quit();
    });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) windowManagerFactory.CreateWindows();
    });

    app.on("ready", async () => {

      // windowManagerFactory.CreateSplashWindow()
      if (isDevelopment && !process.env.IS_TEST) {
        try {
          await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
          console.error("Vue Devtools failed to install:", e.toString());
        }
      }
      
      if (!process.env.WEBPACK_DEV_SERVER_URL) {
        createProtocol('app')
      }

      windowManagerFactory.CreateWindows();
    });

  }

  InitializeIpcReception(ipcChannels) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)))
  }

}


new CreateApp()