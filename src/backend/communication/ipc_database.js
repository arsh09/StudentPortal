import { IpcChannelInterface } from "@/backend/communication/ipc_common"

const {
    DATABASE_INTERFACE_CHANNEL,
    HANDLE_SQL_QUERY,
} = require( "@/backend/communication/constants.js" )

import DatabaseProcess  from "@/backend/process/database_process";
const databaseProcess = DatabaseProcess.GetInstance();

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
                case HANDLE_SQL_QUERY:
                {
                    data['response'] = databaseProcess.HandleRunQuery(request)
                    console.log("HANDLE_SQL_QUERY")
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