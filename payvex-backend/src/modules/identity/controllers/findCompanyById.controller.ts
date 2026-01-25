/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { FindCompanyByIdService } from '../services/findCompanyById.service';

@Controller('companies')
export class FindCompanyByIdController {
  constructor(private findCompanyByIdService: FindCompanyByIdService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    const company = await this.findCompanyByIdService.findById(id);
    return company;
  }
}
