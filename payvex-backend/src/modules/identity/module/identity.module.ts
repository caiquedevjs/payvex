/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';

// Seus controllers
import { findAllCompanyController } from '../controllers/findAllCompany.controller';
import { FindAllIdentityController } from '../controllers/findAllIdentity.service';
import { identityLoginController } from '../controllers/identity.login.controller';
import { SignupController } from '../controllers/indentity.signup.controller';

// Seus serviços
import { PrismaService } from 'src/prisma.service/prisma.service';
import { FindAllCompanyService } from '../services/findAllCompany.service';
import { FindAllIndetityService } from '../services/findAllIdentity.service';
import { identityLoginService } from '../services/identity.login.service';
import { singupCreateService } from '../services/signup.create.service';

@Module({
  imports: [AuthModule],

  controllers: [
    SignupController,
    identityLoginController,
    findAllCompanyController,
    FindAllIdentityController,
  ],
  providers: [
    singupCreateService,
    identityLoginService,
    FindAllCompanyService,
    FindAllIndetityService,
    PrismaService,
  ],
})
export class IdentityModule {}
