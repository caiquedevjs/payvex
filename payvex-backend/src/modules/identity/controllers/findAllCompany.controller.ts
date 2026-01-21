/* eslint-disable prettier/prettier */

import { Controller, Get, HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { FindAllCompanyService } from '../services/findAllCompany.service';

@Controller('identity')
export class findAllCompanyController {
  constructor(private findAllCompanyService: FindAllCompanyService) {}

  @Get('/companies')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.findAllCompanyService.findAll();
  }
}
