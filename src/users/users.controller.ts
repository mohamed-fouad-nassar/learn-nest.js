import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Controller,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

import { User } from './user.entity';

import { ShowUserDto } from './dto/show-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { AuthGuard } from '../common/guards/auth.guard';

import { Serialize } from '../common/interceptors/serialize.interceptor';

import { CurrentUser } from './decorators/current-user.decorator';

export interface Session {
  userId: number | null;
}

@Controller('users')
@Serialize(ShowUserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Session() session: Session) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: Session) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @Get('whoami')
  // async currentUser(@Session() session: TSession) {
  //   if (!session.userId) throw new NotFoundException('User not found');
  //   const user = await this.usersService.findOne(session.userId);
  //   return user;
  // }

  @UseGuards(AuthGuard)
  @Get('whoami')
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signout(@Session() session: Session) {
    session.userId = null;
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
