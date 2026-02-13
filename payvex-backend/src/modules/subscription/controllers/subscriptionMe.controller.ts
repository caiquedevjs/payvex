/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SubscriptionService } from '../services/subscription.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('my-subscription')
@UseGuards(JwtAuthGuard) // Protegido: só o lojista vê a dele
export class MySubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  /**
   * Retorna o status atual, limites e consumo da empresa logada
   */
  async getStatus(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const companyId = req.user.companyId;

    return this.subscriptionService.getSubscriptionByCompany(companyId);
  }
}
