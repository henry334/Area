import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";

describe("CreatAcTrigService", () => {
  let service: CreatAcTrigService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatAcTrigService, PrismaService],
    }).compile();

    service = module.get<CreatAcTrigService>(CreatAcTrigService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get triggers of a service and return data", async () => {
    const mockUserId = "mockUserId";
    const mockServiceName = "Discord";
    const mockRequest = { user: { id: mockUserId } };
    const mockService = {
      id: "mockServiceId",
      name: mockServiceName,
      description: "Mock service description",
      logo: "mock-logo-url",
      color: "#ffffff",
      oauth2url: "http://mock-oauth-url.com",
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockTriggers = [
      {
        id: "1",
        toSend: {},
        name: "triggerName",
        serviceName: "serviceName",
        func: "./path/to/func",
        description: "Trigger description",
        availability: true,
      },
    ];

    jest
      .spyOn(prismaService.services, "findUnique")
      .mockResolvedValue(mockService);
    jest
      .spyOn(prismaService.triggersAvailable, "findMany")
      .mockResolvedValue(mockTriggers);
    jest.spyOn(service, "loopSendBackdata").mockImplementation((data) => data);

    const result = await service.getTriggerOfService(
      mockServiceName,
      mockRequest as any
    );

    expect(result).toEqual(mockTriggers);
  });

  it("should return an empty array if no triggers are found", async () => {
    const mockServiceName = "NonExistentService";
    const mockUserId = "mockUserId";
    const mockRequest: any = {
      user: {
        id: mockUserId,
      },
    };

    jest.spyOn(prismaService.services, "findUnique").mockResolvedValue(null);

    await expect(
      service.getTriggerOfService(mockServiceName, mockRequest as any)
    ).rejects.toThrowError(BadRequestException);
  });

  it("should throw BadRequestException if service not found", async () => {
    const mockServiceName = "NonExistentService";
    const mockRequest = { user: { id: "mockUserId" } };

    jest.spyOn(prismaService.services, "findUnique").mockResolvedValue(null);

    await expect(
      service.getTriggerOfService(mockServiceName, mockRequest as any)
    ).rejects.toThrowError(BadRequestException);
  });
});
