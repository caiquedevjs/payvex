/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { GatewayFactory } from '../gateways/gateway.factory';

// Seus controllers
import { TransactionsFindAllController } from '../controllers/transactions.controller';
import { TransactionsCreateController } from '../controllers/transactions.create.controller';

// Seus serviços
import { PrismaService } from 'src/prisma.service/prisma.service';
import { TransactionsService } from '../services/transactions.create.service';
import { TransactionsFindAllService } from '../services/transactions.service';

@Module({
  imports: [AuthModule],

  controllers: [TransactionsCreateController, TransactionsFindAllController],
  providers: [
    TransactionsService,
    PrismaService,
    GatewayFactory,
    TransactionsFindAllService,
  ],
})
export class TransactionsModule {}
