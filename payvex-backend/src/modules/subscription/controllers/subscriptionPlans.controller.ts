import { Controller, Get } from '@nestjs/common';
import { PAYVEX_PLANS } from '../interfaces/subscriptions.interface';

@Controller('plans')
export class PlansController {
  @Get()
  getPublicPlans() {
    return Object.values(PAYVEX_PLANS);
  }
}
