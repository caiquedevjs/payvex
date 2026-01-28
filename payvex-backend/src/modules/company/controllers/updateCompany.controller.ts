/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateCompanyDto } from '../dto/updateCompany.dto';
import { UpdateCompanyService } from '../services/updateCompany.service';

@Controller('companies')
export class UpdateCompanyController {
  constructor(private updateCompanyService: UpdateCompanyService) {}
  @Patch(':id')
  async updateCompany(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    const updatedCompany = await this.updateCompanyService.updateCompany(
      id,
      data,
    );
    return updatedCompany;
  }
}
