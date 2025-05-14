import { BadRequestException } from "@nestjs/common";
import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";

describe("CreatAcTrigService", () => {
  let service: CreatAcTrigService;
  let prismaServiceMock: {
    triggersAvailable: { findUnique: jest.Mock; create: jest.Mock };
  };

  beforeEach(() => {
    prismaServiceMock = {
      triggersAvailable: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    service = new CreatAcTrigService(prismaServiceMock as any);
  });

  it("should create a new trigger and return triggerId", async () => {
    const dto = {
      name: "discord pin msg",
      servicename: "Discord",
      func: "./discord/pinnedmsg.trigger",
      description: "get a trigger when a msg is pinned",
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

    prismaServiceMock.triggersAvailable.findUnique.mockResolvedValue(null);
    prismaServiceMock.triggersAvailable.create.mockResolvedValue({ id: "1" });

    const result = await service.newTrigger(dto, {} as any);

    expect(prismaServiceMock.triggersAvailable.findUnique).toHaveBeenCalledWith(
      { where: { name: dto.name } }
    );
    expect(prismaServiceMock.triggersAvailable.create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        serviceName: dto.servicename,
        func: dto.func,
        description: dto.description,
        toSend: dto.toSend,
      },
    });
    expect(result).toEqual({ triggerId: "1" });
  });

  it("should throw BadRequestException if trigger already exists", async () => {
    const dto = {
      name: "discord pin msg",
      servicename: "Discord",
      func: "./discord/pinnedmsg.trigger",
      description: "get a trigger when a msg is pinned",
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

    prismaServiceMock.triggersAvailable.findUnique.mockResolvedValue({
      /* existing trigger data */
    });

    await expect(service.newTrigger(dto, {} as any)).rejects.toThrow(
      BadRequestException
    );
  });
});
