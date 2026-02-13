/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { PAYVEX_PLANS } from '../interfaces/subscriptions.interface';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  // Retorna os dados da assinatura de uma empresa + contagem real de transações
  async getSubscriptionByCompany(companyId: string) {
    const [subscription, transactionCount] = await Promise.all([
      this.prisma.subscription.findUnique({ where: { companyId } }),
      this.prisma.transaction.count({
        where: {
          filial: { companyId: companyId },
        },
      }),
    ]);

    if (!subscription) {
      throw new NotFoundException(
        'Assinatura não encontrada para esta empresa.',
      );
    }

    return {
      ...subscription,
      currentUsage: transactionCount, // Valor real do banco para a barra de progresso
    };
  }

  // Atualiza os limites no banco (Upgrade de Plano)
  async upgradePlan(companyId: string, planKey: keyof typeof PAYVEX_PLANS) {
    const plan = PAYVEX_PLANS[planKey];

    if (!plan) {
      throw new Error('Plano não encontrado no sistema.');
    }

    return await this.prisma.subscription.update({
      where: { companyId },
      data: {
        planName: plan.name,
        gatewaysLimit: plan.gatewaysLimit,
        usersLimit: plan.usersLimit,
        transactionsLimit: plan.transactionsLimit,
        hasAiAnalyst: plan.hasAiAnalyst,
        multiAppLimit: plan.multiAppLimit,
        status: 'ativo',
      },
    });
  }
}
