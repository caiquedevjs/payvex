/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { FiliaisController } from '../controllers/filiais.controller';
import { FiliaisService } from '../services/filiais.service';

@Module({
  controllers: [FiliaisController],
  providers: [FiliaisService, PrismaService],
  exports: [FiliaisService], // Exportamos caso o TransactionsService precise dele
})
export class FiliaisModule {}