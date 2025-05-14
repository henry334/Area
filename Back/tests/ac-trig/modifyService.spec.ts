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

  it('should modify an existing service and return "Modified!"', async () => {
    const mockServiceId = '1';
    const mockDto = {
      name: 'ModifiedService',
      description: 'Modified Description',
      color: '#ff0000',
      logo: 'modified-logo-url',
      oauth2url: 'http://modified-oauth-url.com',
    };
    const mockRequest = { user: { id: 'mockUserId' } };

    jest
      .spyOn(prismaService.services, 'findUnique')
      .mockResolvedValue({
        id: mockServiceId,
        name: 'OriginalService',
        description: 'Original Description',
        logo: 'original-logo-url',
        color: '#0000ff',
        oauth2url: 'http://original-oauth-url.com',
        created_at: new Date(),
        updated_at: new Date(),
      });
    jest.spyOn(prismaService.services, 'update').mockResolvedValue(null);

    const result = await service.modifyService(mockServiceId, mockDto, mockRequest as any);

    expect(result).toEqual('Modified!');
  });

  it('should throw BadRequestException if service not found', async () => {
    const mockServiceId = 'NonExistentServiceId';
    const mockDto = {
      name: 'ModifiedService',
      description: 'Modified Description',
      color: '#ff0000',
      logo: 'modified-logo-url',
      oauth2url: 'http://modified-oauth-url.com',
    };
    const mockRequest = { user: { id: 'mockUserId' } };

    jest
      .spyOn(prismaService.services, 'findUnique')
      .mockResolvedValue(null);

    await expect(
      service.modifyService(mockServiceId, mockDto, mockRequest as any)
    ).rejects.toThrowError(BadRequestException);
  });
});
