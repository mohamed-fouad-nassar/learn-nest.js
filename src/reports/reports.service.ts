import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

import { Report } from './report.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(body: CreateReportDto, user: User) {
    const report = this.repo.create({ ...body, user });
    return this.repo.save(report);
  }

  findAll() {
    return this.repo.find({
      relations: { user: true },
    });
  }

  async findOne(id: number) {
    const report = await this.repo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!report) throw new NotFoundException('Report not found');

    return report;
  }

  async update(id: number, body: UpdateReportDto) {
    const report = await this.findOne(id);

    this.repo.merge(report, body);
    return this.repo.save(report);
  }

  async approve(id: number) {
    const report = await this.findOne(id);
    if (report.approved)
      throw new BadRequestException('Report Already Approved');

    report.approved = true;
    return this.repo.save(report);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    return this.repo.remove(report);
  }
}
