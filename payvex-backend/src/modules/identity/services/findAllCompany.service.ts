import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';

@Injectable()
export class FindAllCompanyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
     // eslint-disable-next-line prettier/prettier

    const companies = await this.prisma.company.findMany({
      include: {
        filiais: true,
        _count: {
          select: { users: true },
        },
      },
    });
    return companies;
  }
}