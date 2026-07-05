import { Request } from 'express';
import { User } from '../user.entity';
export type CustomRequest = Request & {
    currentUser?: User;
    session?: {
        userId?: number;
    };
};
export declare const CurrentUser: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
