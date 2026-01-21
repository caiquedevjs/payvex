import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';

@Injectable()
export class FindAllIndetityService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const identities = await this.prisma.user.findMany({
      include: {
        company: true,
      },
    });
    return identities;
  }
}
