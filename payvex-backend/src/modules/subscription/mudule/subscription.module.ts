/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { MySubscriptionController } from '../controllers/subscriptionMe.controller';
import { PlansController } from '../controllers/subscriptionPlans.controller';
import { SubscriptionService } from '../services/subscription.service';

@Module({
  controllers: [
    PlansController, // Rota: /plans (Pública/Catálogo)
    MySubscriptionController, // Rota: /my-subscription (Privada/Status)
  ],
  providers: [SubscriptionService, PrismaService],
  exports: [SubscriptionService], // Exportamos para que outros módulos (ex: Filial ou IA) consultem limites
})
export class SubscriptionModule {}
