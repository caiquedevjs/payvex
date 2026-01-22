/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service/prisma.service';

@Injectable()
export class TransactionsFindAllService {
  constructor(private prisma: PrismaService) {}

  // 1. Lista todas as transações de uma filial com filtros
  async findAll(filialId: string, status?: TransactionStatus) {
    return this.prisma.transaction.findMany({
      where: {
        filialId,
        ...(status && { status }), // Só filtra por status se ele for enviado
      },
      orderBy: { createdAt: 'desc' }, // Mais recentes primeiro
    });
  }

  // 2. Calcula os totais para os "Cards" do Dashboard
  async getStats(filialId: string) {
  const stats = await this.prisma.transaction.groupBy({
    by: ['status'],
    where: { filialId },
    _sum: {
      amount: true,
      fee: true,
      netAmount: true,
    },
  });

  const paid = stats.find(s => s.status === 'PAID');

  return {
    totalSales: Number(paid?._sum.amount || 0),
    totalFees: Number(paid?._sum.fee || 0),
    totalNet: Number(paid?._sum.netAmount || 0), // O que realmente vai para o bolso
    pendingAmount: Number(stats.find(s => s.status === 'PENDING')?._sum.amount || 0),
  };
}

  }
