/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';

// Seus controllers
import { findAllCompanyController } from '../controllers/findAllCompany.controller';
import { FindAllIdentityController } from '../controllers/findAllIdentity.service';
import { FindCompanyByIdController } from '../controllers/findCompanyById.controller';
import { FindIdentityByIdController } from '../controllers/findIdentityById.controller';
import { identityLoginController } from '../controllers/identity.login.controller';
import { SignupController } from '../controllers/indentity.signup.controller';

// Seus serviços
import { PrismaService } from 'src/prisma.service/prisma.service';
import { FindAllCompanyService } from '../services/findAllCompany.service';
import { FindAllIndetityService } from '../services/findAllIdentity.service';
import { FindCompanyByIdService } from '../services/findCompanyById.service';
import { FindIdentityByIdService } from '../services/findIdentityById.service';
import { identityLoginService } from '../services/identity.login.service';
import { singupCreateService } from '../services/signup.create.service';

@Module({
  imports: [AuthModule],

  controllers: [
    SignupController,
    identityLoginController,
    findAllCompanyController,
    FindAllIdentityController,
    FindIdentityByIdController,
    FindCompanyByIdController,
  ],
  providers: [
    singupCreateService,
    identityLoginService,
    FindAllCompanyService,
    FindAllIndetityService,
    PrismaService,
    FindIdentityByIdService,
    FindCompanyByIdService,
  ],
})
export class IdentityModule {}
