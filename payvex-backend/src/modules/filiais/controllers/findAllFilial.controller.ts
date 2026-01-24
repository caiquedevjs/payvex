/* eslint-disable prettier/prettier */
 
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FindAllFilialService } from '../services/findAllFilial.service';

@Controller('filiais')
export class FindAllFilialController {
  constructor(private findAllFilialService: FindAllFilialService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get() {
    const filiais = await this.findAllFilialService.FindAll();
    return filiais;
  }
}
