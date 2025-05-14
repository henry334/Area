import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should connect to Prisma client on module init', async () => {
    const connectSpy = jest.spyOn(prismaService, '$connect');
    await prismaService.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });
});
