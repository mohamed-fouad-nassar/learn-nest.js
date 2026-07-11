"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookie_session_1 = __importDefault(require("cookie-session"));
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./users/user.entity");
const users_module_1 = require("./users/users.module");
const report_entity_1 = require("./reports/report.entity");
const reports_module_1 = require("./reports/reports.module");
const logging_middleware_1 = require("./common/middlewares/logging.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logging_middleware_1.LoggingMiddleware).forRoutes('*');
        consumer
            .apply((0, cookie_session_1.default)({
            keys: ['this-is-the-key-of-cookie-session-middleware'],
        }))
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'better-sqlite3',
                        database: config.get('DB_NAME'),
                        entities: [user_entity_1.User, report_entity_1.Report],
                        synchronize: true,
                    };
                },
            }),
            reports_module_1.ReportsModule,
            users_module_1.UsersModule,
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                }),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map