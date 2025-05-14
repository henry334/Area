import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
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

  it('should delete an existing trigger and return "Deleted!"', async () => {
    const mockTriggerId = '1';
    const mockRequest = { user: { id: 'mockUserId' } };

    jest
      .spyOn(prismaService.triggersAvailable, 'findUnique')
      .mockResolvedValue({
        id: mockTriggerId,
        toSend: {}, // Add required properties as per your schema
        name: 'mockTriggerName',
        serviceName: 'mockServiceName',
        func: 'mockFunction',
        description: 'Mock description',
        availability: true,
      });
    jest.spyOn(prismaService.triggersAvailable, 'delete').mockResolvedValue(null);

    const result = await service.deleteTrigger(mockTriggerId, mockRequest as any);

    expect(result).toEqual('Deleted!');
  });

  it('should throw BadRequestException if trigger not found', async () => {
    const mockTriggerId = 'NonExistentTriggerId';
    const mockRequest = { user: { id: 'mockUserId' } };

    jest
      .spyOn(prismaService.triggersAvailable, 'findUnique')
      .mockResolvedValue(null);

    await expect(
      service.deleteTrigger(mockTriggerId, mockRequest as any)
    ).rejects.toThrowError(BadRequestException);
  });
});
