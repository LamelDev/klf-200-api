'use strict';

import { GW_FRAME_REQ } from "./common";

export class GW_RENAME_SCENE_REQ extends GW_FRAME_REQ {
    constructor(readonly SceneID: number, readonly Name: string) {
        super();

        if (Buffer.from(this.Name).byteLength > 64)
            throw "Name too long.";

        const buff = this.Data.slice(this.offset);
        buff.writeUInt8(this.SceneID, 0);
        // Fill the name part with spaces first:
        // buff.slice(1, 66).fill(" ");
        buff.write(this.Name, 1);
    }

    protected InitializeBuffer() {
        this.AllocBuffer(65);
    }
}