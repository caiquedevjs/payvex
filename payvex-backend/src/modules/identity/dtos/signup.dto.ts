import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  // Dados do Usuário
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  userPassword: string;

  // Dados da Empresa
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString() // No mundo real, você usaria uma validação de CNPJ
  @IsNotEmpty()
  companyCnpj: string;
}