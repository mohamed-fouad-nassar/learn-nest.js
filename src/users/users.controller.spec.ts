import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // fake users service instance
    fakeUsersService = {
      create: (dto: CreateUserDto) => {
        const user = {
          id: 1,
          email: dto.email,
          password: dto.password,
        };
        return Promise.resolve(user);
      },
      findAll: () => Promise.resolve([]),
      find: (email: string) => {
        const user = { id: 1, email, password: 'hashed' };
        return Promise.resolve([user]);
      },
      findOne: (id: number) => {
        const user = { id, email: 'test@example.com', password: 'hashed' };
        return Promise.resolve(user);
      },
      remove: (id: number) => {
        const user = { id, email: 'remove@example.com', password: 'hashed' };
        return Promise.resolve(user);
      },
      update: (id: number, data: UpdateUserDto) => {
        const user = {
          id,
          email: data.email || 'updated@example.com',
          password: data.password || 'hashed',
        };
        return Promise.resolve(user);
      },
    };

    // fake auth service instance
    fakeAuthService = {
      signup: (email: string, password: string) => {
        const user = { id: 1, email, password };
        return Promise.resolve(user);
      },
      signin: (email: string, password: string) => {
        const user = { id: 2, email, password };
        return Promise.resolve(user);
      },
    };

    // the controller DI (Dependency Injection) Container
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    // the controller instance
    controller = module.get(UsersController);
  });

  /* ------------------------- Test Cases ------------------------- */

  it('can create an instance of controller', () => {
    expect(controller).toBeDefined();
  });

  it('signup creates a session and returns the user', async () => {
    const body: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const session = { userId: null as number | null };
    const result = await controller.signup(body, session);

    expect(session.userId).toBe(1);
    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('signin creates a session and returns the user', async () => {
    const body: CreateUserDto = {
      email: 'login@example.com',
      password: 'password123',
    };
    const session = { userId: null as number | null };

    const result = await controller.signin(body, session);

    expect(session.userId).toBe(2);
    expect(result).toEqual({
      id: 2,
      email: 'login@example.com',
      password: 'password123',
    });
  });

  it('currentUser returns the current authenticated user', () => {
    const user = {
      id: 3,
      email: 'whoami@example.com',
      password: 'hashed',
    };

    expect(controller.currentUser(user)).toEqual(user);
  });

  it('signout clears the session user id', () => {
    const session = { userId: 42 };
    controller.signout(session);

    expect(session.userId).toBeNull();
  });

  it('findAll returns all users', async () => {
    const users = await controller.findAll();

    expect(users).toEqual([]);
  });

  it('findOne returns a user by id', async () => {
    const user = await controller.findOne('5');

    expect(user).toEqual({
      id: 5,
      email: 'test@example.com',
      password: 'hashed',
    });
  });

  it('update returns the updated user', async () => {
    const updateDto: UpdateUserDto = {
      email: 'updated@example.com',
      password: 'new',
    };
    const user = await controller.update('6', updateDto);

    expect(user).toEqual({
      id: 6,
      email: 'updated@example.com',
      password: 'new',
    });
  });

  it('remove deletes a user by id', async () => {
    const user = await controller.remove('7');

    expect(user).toEqual({
      id: 7,
      email: 'remove@example.com',
      password: 'hashed',
    });
  });
});
