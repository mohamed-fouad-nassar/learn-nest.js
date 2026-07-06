"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupApp;
const cookie_session_1 = __importDefault(require("cookie-session"));
const common_1 = require("@nestjs/common");
function setupApp(app) {
    app.setGlobalPrefix('api');
    app.use((0, cookie_session_1.default)({
        keys: ['aisfpoghyertsdf'],
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
}
//# sourceMappingURL=setup-app.js.map