"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class GW_GET_SCENE_INFORMATION_CFM extends common_1.GW_FRAME_CFM {
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case common_1.GW_COMMON_STATUS.SUCCESS:
                throw new Error("No error.");
            case common_1.GW_COMMON_STATUS.ERROR:
                return "Request failed.";
            case common_1.GW_COMMON_STATUS.INVALID_NODE_ID:
                return "Invalid scene ID.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_GET_SCENE_INFORMATION_CFM = GW_GET_SCENE_INFORMATION_CFM;
//# sourceMappingURL=GW_GET_SCENE_INFORMATION_CFM.js.map