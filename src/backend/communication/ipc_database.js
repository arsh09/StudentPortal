import { IpcChannelInterface } from "@/backend/communication/ipc_common"

const {
    DATABASE_INTERFACE_CHANNEL,
    HANDLE_ADD_STUDENT,
} = require( "@/backend/communication/constants.js" )


export class DatabaseInterfaceChannel extends IpcChannelInterface
{
    getName() 
    {
        console.log("getName(): ", DATABASE_INTERFACE_CHANNEL)
        return DATABASE_INTERFACE_CHANNEL
    }   

    handle(event, request) 
    {
        const data = {}
        if (!request.responseChannel)
        {
            request.responseChannel = `${this.getName()}-response`
        }

        if ('e' in request.params)
        {
            switch (request.params.e)
            {
                case HANDLE_ADD_STUDENT:
                {
                    data['done'] = true
                    console.log("HANDLE_CHECK_FOR_UPDATE")
                } break

                default: 
                    break
            }
        }

        event.sender.send( request.responseChannel, 
        {
            data 
        })
    }
}