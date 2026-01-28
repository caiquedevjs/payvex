import { Controller, Get, HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { FindAllCompanyService } from '../services/findAllCompany.service';

@Controller('companies')
export class findAllCompanyController {
  constructor(private findAllCompanyService: FindAllCompanyService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.findAllCompanyService.findAll();
  }
}
