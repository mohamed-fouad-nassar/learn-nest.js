import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // fake users service instance
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (dto: CreateUserDto) => {
        const user = {
          id: (users[users.length - 1]?.id || 0) + 1,
          email: dto.email,
          password: dto.password,
        };
        users.push(user);
        return Promise.resolve(user);
      },
    };

    // the service DI (Dependency Injection) Container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    // the service instance
    service = module.get(AuthService);
  });

  /* ------------------------- Test Cases ------------------------- */

  it('can create an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signup('q3l0T@example.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
  });

  it('throws an error when signup with email that is in use', async () => {
    await service.signup('q3l0T@example.com', 'asdf');
    await expect(service.signup('q3l0T@example.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error when signin with email that is not registered', async () => {
    await expect(service.signin('q3l0T@example.com', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws an error when signin with wrong password', async () => {
    await service.signup('q3l0T@example.com', 'asdf');

    await expect(
      service.signin('q3l0T@example.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('signin returns a user with correct password with hashing', async () => {
    await service.signup('q3l0T@example.com', 'asdf');
    const user = await service.signin('q3l0T@example.com', 'asdf');
    expect(user).toBeDefined();
  });
});
