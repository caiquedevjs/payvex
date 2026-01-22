/* eslint-disable prettier/prettier */
 
import { IsOptional, IsString } from 'class-validator';

export class UpdateGatewayConfigDto {
  @IsString()
  @IsOptional()
  stripeSecretKey?: string;

  @IsString()
  @IsOptional()
  stripePublicKey?: string;

  @IsString()
  @IsOptional()
  stripeWebhookSecret?: string;

  @IsString()
  @IsOptional()
  mercadoPagoAccessToken?: string;
}
