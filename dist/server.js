"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./config/database"));
const http_1 = require("http");
const is_port_available_1 = __importDefault(require("is-port-available"));
const app_1 = __importDefault(require("./app"));
const seedDb_1 = require("./utils/seedDb");
const server = new http_1.Server(app_1.default);
(0, database_1.default)().then(async () => {
    await (0, seedDb_1.seedDB)();
});
const PORT = process.env.PORT || 8000;
const getAvailablePort = async () => {
    let port = PORT;
    while (!(await (0, is_port_available_1.default)(port))) {
        port++;
    }
    return port;
};
getAvailablePort().then(async (port) => {
    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
//# sourceMappingURL=server.js.map