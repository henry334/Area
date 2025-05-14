import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";
import { PrismaService } from "../../prisma/prisma.service";

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

  describe("newAction", () => {
    it("should throw BadRequestException if action with the given name already exists", async () => {
      const dto = {
        name: "discord send msg",
        servicename: "Discord",
        func: "./discord/sendmsg.action",
        description: "send a msg to a channel",
        toSend: [
          {
            dropdown: {
              name: "ServerName",
              object: ["name", "guildId"],
              render: "name",
              return: "guildId",
              choices: [],
            },
          },
          {
            text: {
              return: "message",
              placeholder: "Message",
            },
          },
          {
            text: {
              return: "ChannelName",
              placeholder: "Channel Name",
            },
          },
        ],
      };

      jest
        .spyOn(prismaService.actionsAvailable, "findUnique")
        .mockResolvedValue({
          id: "1",
          toSend: {
            key1: "value1",
            key2: "value2",
          },
          name: "actionName",
          serviceName: "serviceName",
          func: "./path/to/func",
          description: "Action description",
          availability: true,
        });

      await expect(service.newAction(dto, {} as any)).rejects.toThrowError(
        BadRequestException
      );
    });

    it("should create a new action and return actionId", async () => {
      const dto = {
        name: "new action",
        servicename: "Discord",
        func: "./discord/new.action",
        description: "description here",
        toSend: [
          {
            dropdown: {
              name: "ServerName",
              object: ["name", "guildId"],
              render: "name",
              return: "guildId",
              choices: [],
            },
          },
        ],
      };

      jest
        .spyOn(prismaService.actionsAvailable, "findUnique")
        .mockResolvedValue(null);
      jest.spyOn(prismaService.actionsAvailable, "create").mockResolvedValue({
        id: "1",
        toSend: {
          key1: "value1",
          key2: "value2",
        },
        name: "actionName",
        serviceName: "serviceName",
        func: "./path/to/func",
        description: "Action description",
        availability: true,
      });

      const result = await service.newAction(dto, {} as any);

      expect(result).toEqual({ actionId: "1" });
    });
  });
});
