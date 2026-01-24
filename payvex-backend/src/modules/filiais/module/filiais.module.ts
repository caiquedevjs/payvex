/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

// coontrollers //
import { PrismaService } from 'src/prisma.service/prisma.service';
import { FiliaisController } from '../controllers/filiais.controller';
import { FindAllFilialController } from '../controllers/findAllFilial.controller';
import { FindFilialByCompanyController } from '../controllers/FindFilialByCompany.controller';

// services //
import { FiliaisService } from '../services/filiais.service';
import { FindAllFilialService } from '../services/findAllFilial.service';
import { FindFilialByCompanyService } from '../services/FindFilialByCompany.service';
@Module({
  controllers: [
    FiliaisController,
    FindFilialByCompanyController,
    FindAllFilialController,
  ],
  providers: [
    FiliaisService,
    FindFilialByCompanyService,
    FindAllFilialService,
    PrismaService,
  ],
  exports: [FiliaisService], // Exportamos caso o TransactionsService precise dele
})
export class FiliaisModule {}
