import { ipcRenderer } from "electron";


export class IpcRequestService 
{
    send(channel, request)
    {
        // If there's no responseChannel let's auto-generate it
        if (!request.responseChannel) 
        {
            request.responseChannel = `${channel}-response-${new Date().getTime()}`
        }

        ipcRenderer.send(channel, request);

        // This method returns a promise which will be resolved when the response has arrived.
        return new Promise(resolve => {
            ipcRenderer.once(request.responseChannel, (event, response) => resolve(response));
        });
    }
}