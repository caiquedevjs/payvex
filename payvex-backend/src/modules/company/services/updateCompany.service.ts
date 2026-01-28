/* eslint-disable prettier/prettier */
 
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { UpdateCompanyDto } from '../dto/updateCompany.dto';

@Injectable()
export class UpdateCompanyService {
  constructor(private prismaSerivce: PrismaService) {}

  async updateCompany(id: string, data: UpdateCompanyDto) {
    const updatedCompany = await this.prismaSerivce.company.update({
      where: { id },
      data,
    });
    return updatedCompany;
  }
}
