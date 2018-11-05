'use strict';

import { GW_FRAME_REQ } from "./common";

export class GW_SET_UTC_REQ extends GW_FRAME_REQ {
    constructor(readonly UTCTime: Date = new Date()) {
        super();

        const buff = this.Data.slice(this.offset);  // View on the internal buffer makes setting the data easier
        buff.writeUInt32BE(UTCTime.valueOf() / 1000, 0);
    }

    protected InitializeBuffer() {
        this.AllocBuffer(4);
    }
}