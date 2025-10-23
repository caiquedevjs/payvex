import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 2. IMPORTAR ConfigService (necessário para o JWT)
import { JwtModule } from '@nestjs/jwt'; // 1. IMPORTAR O JwtModule

// Seus controllers
import { identityLoginController } from '../controllers/identity.login.controller';
import { SignupController } from '../controllers/indentity.signup.controller';

// Seus serviços
import { PrismaService } from 'src/prisma.service/prisma.service';
import { identityLoginService } from '../services/identity.login.service';
import { singupCreateService } from '../services/signup.create.service';

// O PrismaService NÃO é importado aqui

@Module({
  imports: [
    // 3. REGISTRAR O JwtModule AQUI
    // Isso disponibiliza o 'JwtService' para injeção
    JwtModule.registerAsync({
      imports: [ConfigModule], // Para ler o .env
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Pega o segredo do .env
        signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
      }),
    }),
  ],
  controllers: [
    SignupController,
    identityLoginController
  ],
  providers: [
    singupCreateService,
    identityLoginService,
    PrismaService

    // 4. REMOVA O PrismaService DAQUI
    // Ele já é global e não deve ser re-declarado.
  ],
})
export class IdentityModule {}