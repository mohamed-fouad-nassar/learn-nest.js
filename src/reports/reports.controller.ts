import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { ReportsService } from './reports.service';

import { ShowReportDto } from './dto/show-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

import { User } from '../users/user.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';

import { AuthGuard } from '../common/guards/auth.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ShowReportDto)
  create(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get()
  @Serialize(ShowReportDto)
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @Serialize(ShowReportDto)
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateReportDto) {
    return this.reportsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
