/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindFilialByCompanyService } from '../services/FindFilialByCompany.service';

@Controller('filiais') // O prefixo da rota será /filiais
export class FindFilialByCompanyController {
  constructor(
    private readonly findFilialByCompanyService: FindFilialByCompanyService,
  ) {}

  @Get(':id') // Rota final: GET /filiais/id_da_filial
  @UseGuards(JwtAuthGuard)
  async handle(@Param('id') id: string, @Req() req: any) {
    // Pegamos o companyId que o seu AuthGuard injetou no Request após validar o JWT
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const companyId = req.user.companyId;

    if (!companyId) {
      throw new NotFoundException('Empresa não identificada no token.');
    }

    return this.findFilialByCompanyService.execute(id, companyId);
  }
}
