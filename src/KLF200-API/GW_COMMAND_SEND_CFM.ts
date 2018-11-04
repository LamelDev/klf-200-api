'use strict';

import { GW_FRAME_CFM } from "./common";
import { CommandStatus } from "./GW_COMMAND";

export class GW_COMMAND_SEND_CFM extends GW_FRAME_CFM {
    public readonly SessionID: number;
    public readonly CommandStatus: CommandStatus;

    constructor(Data: Buffer) {
        super(Data);

        this.SessionID = this.Data.readUInt16BE(0);
        this.CommandStatus = this.Data.readUInt8(2);
    }
}