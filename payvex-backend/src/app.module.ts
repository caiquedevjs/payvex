import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from './modules/identity/module/identity.module';
import { TransactionsModule } from './modules/transaction/module/transaction.module';
@Module({
  imports: [
    IdentityModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true, // <-- Isso torna as variáveis .env globais
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
