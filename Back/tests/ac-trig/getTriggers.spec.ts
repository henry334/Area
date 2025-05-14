import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";

describe("CreatAcTrigService", () => {
  let service: CreatAcTrigService;
  let prismaServiceMock: { triggersAvailable: { findMany: jest.Mock } };

  beforeEach(() => {
    prismaServiceMock = {
      triggersAvailable: {
        findMany: jest.fn(),
      },
    };

    service = new CreatAcTrigService(prismaServiceMock as any);
  });

  it("should return a list of triggers in the correct format", async () => {
    const mockTriggers = [
      {
        name: "PinMessage",
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
      },
      {
        name: "SpecifiqueMessage",
        servicename: "Discord",
        func: "./discord/specifiquemessage.trigger",
        description: "get a trigger when a specifique message is sent",
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
        ],
      },
    ];

    prismaServiceMock.triggersAvailable.findMany.mockResolvedValue(
      mockTriggers
    );

    const result = await service.getTriggers({} as any);

    expect(prismaServiceMock.triggersAvailable.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockTriggers);
  });
});
