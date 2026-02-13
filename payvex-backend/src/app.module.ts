import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FiliaisModule } from './modules/filiais/module/filiais.module';
import { IdentityModule } from './modules/identity/module/identity.module';
import { SubscriptionModule } from './modules/subscription/mudule/subscription.module';
import { TransactionsModule } from './modules/transaction/module/transaction.module';
import { WebhookModule } from './modules/transaction/webhooks/webhooks.module';

@Module({
  imports: [
    IdentityModule,
    TransactionsModule,
    WebhookModule,
    FiliaisModule,
    SubscriptionModule,
    ConfigModule.forRoot({
      isGlobal: true, // <-- Isso torna as variáveis .env globais
    }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD, // O "token" de senha que você achou
        tls: {}, // 👈 MUITO IMPORTANTE: Isso ativa o SSL obrigatório do Upstash
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
