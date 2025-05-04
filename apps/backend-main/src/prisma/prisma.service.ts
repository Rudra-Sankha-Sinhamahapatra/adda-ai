import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import prisma from '@repo/db/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public client = prisma;

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
