/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';

@Injectable()
export class FindCompanyByIdService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.company.findUnique({
      where: { id },
      include: {
        filiais: true, // Traz o array de filiais
        users: true, // Traz o array de usuários (para pegarmos o Admin)
      },
    });
  }
}
