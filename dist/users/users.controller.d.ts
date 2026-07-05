import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface Session {
    userId: number | null;
}
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    signup(body: CreateUserDto, session: Session): Promise<User>;
    signin(body: CreateUserDto, session: Session): Promise<User>;
    currentUser(user: User): User;
    signout(session: Session): void;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, body: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
}
