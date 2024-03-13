import { ipcRenderer, contextBridge } from 'electron'
import { DATABASE_INTERFACE_CHANNEL } from './backend/communication/constants'
window.ipcRenderer = ipcRenderer


const validChannels = [
    DATABASE_INTERFACE_CHANNEL
]

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, request) => {
        // whitelist channels
        if (validChannels.includes(channel)) {

            if (!request.responseChannel) 
            {
                request.responseChannel = `${channel}-response-${new Date().getTime()}`
            }

            ipcRenderer.send(channel, request);
            return new Promise(resolve => {
                ipcRenderer.once(request.responseChannel, (event, response) => resolve(response));
            });
            
        }
    },
    receive: (channel, func) => {
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    }
})