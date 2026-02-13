/* eslint-disable prettier/prettier */
 
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { PAYVEX_PLANS } from '../interfaces/subscriptions.interface';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  // Retorna os dados da assinatura de uma empresa
  async getSubscription(companyId: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { companyId },
    });

    if (!sub) throw new NotFoundException('Assinatura não encontrada');
    return sub;
  }

  // "Bate o martelo" e atualiza os limites no banco (será chamado pelo Webhook no futuro)
  async upgradePlan(companyId: string, planKey: keyof typeof PAYVEX_PLANS) {
    const plan = PAYVEX_PLANS[planKey];

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
