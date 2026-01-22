/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

 
import {
    Body,
    Controller,
    Param,
    Patch,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; // Seu guard customizado
import { UpdateGatewayConfigDto } from '../dto/update-gateway-config.dto';
import { FiliaisService } from '../services/filiais.service';

@Controller('filiais')
export class FiliaisController {
  constructor(private readonly filiaisService: FiliaisService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id/gateways')
  async updateGateways(
    @Param('id') filialId: string,
    @Body() dto: UpdateGatewayConfigDto,
    @Request() req,
  ) {
    const { companyId } = req.user; // Extraído do Token JWT

    return this.filiaisService.updateGatewayKeys(filialId, companyId, dto);
  }
}
