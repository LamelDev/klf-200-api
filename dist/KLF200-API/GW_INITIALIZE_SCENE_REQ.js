'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class GW_INITIALIZE_SCENE_REQ extends common_1.GW_FRAME_REQ {
    constructor() {
        super();
    }
    InitializeBuffer() {
        this.AllocBuffer(0);
    }
}
exports.GW_INITIALIZE_SCENE_REQ = GW_INITIALIZE_SCENE_REQ;
//# sourceMappingURL=GW_INITIALIZE_SCENE_REQ.js.map