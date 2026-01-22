/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionsFindAllService } from '../services/transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard) // Protege para que só usuários logados vejam
export class TransactionsFindAllController {
  constructor(private readonly transactionsService: TransactionsFindAllService) {}

  // Rota: GET /transactions?filialId=xxx&status=PAID
  @Get()
  async findAll(
    @Query('filialId') filialId: string,
    @Query('status') status?: TransactionStatus,
  ) {
    return this.transactionsService.findAll(filialId, status);
  }

  // Rota: GET /transactions/stats/:filialId
  @Get('stats/:filialId')
  async getStats(@Param('filialId') filialId: string) {
    return this.transactionsService.getStats(filialId);
  }
}