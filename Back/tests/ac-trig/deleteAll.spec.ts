import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatAcTrigService } from '../../src/ac-trig/creat-ac-trig.service';

describe('CreatAcTrigService', () => {
  let service: CreatAcTrigService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatAcTrigService, PrismaService],
    }).compile();

    service = module.get<CreatAcTrigService>(CreatAcTrigService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete all actions, triggers, and services and return "Deleted all!"', async () => {
    jest.spyOn(prismaService.actionsAvailable, 'deleteMany').mockResolvedValue({ count: 1 });
    jest.spyOn(prismaService.triggersAvailable, 'deleteMany').mockResolvedValue({ count: 2 });
    jest.spyOn(prismaService.services, 'deleteMany').mockResolvedValue({ count: 3 });

    const result = await service.deleteAll({} as any);

    expect(result).toEqual('Deleted all!');
    expect(prismaService.actionsAvailable.deleteMany).toHaveBeenCalled();
    expect(prismaService.triggersAvailable.deleteMany).toHaveBeenCalled();
    expect(prismaService.services.deleteMany).toHaveBeenCalled();
  });
});
