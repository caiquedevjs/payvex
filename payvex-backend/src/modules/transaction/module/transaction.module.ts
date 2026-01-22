import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { GatewayFactory } from '../gateways/gateway.factory';

// Seus controllers
import { TransactionsCreateController } from '../controllers/transactions.create.controller';

// Seus serviços
import { PrismaService } from 'src/prisma.service/prisma.service';
import { TransactionsService } from '../services/transactions.create.service';
@Module({
  imports: [AuthModule],

  controllers: [TransactionsCreateController],
  providers: [TransactionsService, PrismaService, GatewayFactory],
})
export class TransactionsModule {}
