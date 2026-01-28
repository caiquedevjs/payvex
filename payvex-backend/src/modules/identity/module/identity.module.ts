import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';

// Seus controllers
import { findAllCompanyController } from '../../company/controllers/findAllCompany.controller';
import { FindCompanyByIdController } from '../../company/controllers/findCompanyById.controller';
import { FindAllIdentityController } from '../controllers/findAllIdentity.service';
import { FindIdentityByIdController } from '../controllers/findIdentityById.controller';
import { identityLoginController } from '../controllers/identity.login.controller';
import { SignupController } from '../controllers/indentity.signup.controller';

// Seus serviços
import { PrismaService } from 'src/prisma.service/prisma.service';
import { FindAllCompanyService } from '../../company/services/findAllCompany.service';
import { FindCompanyByIdService } from '../../company/services/findCompanyById.service';
import { FindAllIndetityService } from '../services/findAllIdentity.service';
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
