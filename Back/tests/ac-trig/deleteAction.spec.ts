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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete an existing action and return "Deleted!"', async () => {
    const mockActionId = '1';
    const mockRequest = { user: { id: 'mockUserId' } };

    jest
      .spyOn(prismaService.actionsAvailable, 'findUnique')
      .mockResolvedValue({
        id: mockActionId,
        toSend: {},
        name: 'mockActionName',
        serviceName: 'mockServiceName',
        func: 'mockFunction',
        description: 'Mock description',
        availability: true,
      });
    jest.spyOn(prismaService.actionsAvailable, 'delete').mockResolvedValue(null);

    const result = await service.deleteAction(mockActionId, mockRequest as any);

    expect(result).toEqual('Deleted!');
  });

  it('should throw BadRequestException if action not found', async () => {
    const mockActionId = 'NonExistentActionId';
    const mockRequest = { user: { id: 'mockUserId' } };

    jest
      .spyOn(prismaService.actionsAvailable, 'findUnique')
      .mockResolvedValue(null);

    await expect(
      service.deleteAction(mockActionId, mockRequest as any)
    ).rejects.toThrowError(BadRequestException);
  });
});
