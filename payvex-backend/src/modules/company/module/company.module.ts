/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { PrismaService } from 'src/prisma.service/prisma.service';

// Seus controllers
import { findAllCompanyController } from '../controllers/findAllCompany.controller';
import { UpdateCompanyController } from '../controllers/updateCompany.controller';

// Seus serviços
import { FindAllCompanyService } from '../services/findAllCompany.service';
import { UpdateCompanyService } from '../services/updateCompany.service';

@Module({
  imports: [AuthModule],
  controllers: [UpdateCompanyController, findAllCompanyController],
  providers: [UpdateCompanyService, FindAllCompanyService, PrismaService],
})
export class CompanyModule {}
