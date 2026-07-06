"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const setup_app_1 = __importDefault(require("./setup-app"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, setup_app_1.default)(app);
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map