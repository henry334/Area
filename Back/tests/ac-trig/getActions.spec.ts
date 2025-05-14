import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";

describe("CreatAcTrigService", () => {
  let service: CreatAcTrigService;
  let prismaServiceMock: { actionsAvailable: { findMany: jest.Mock } };

  beforeEach(() => {
    prismaServiceMock = {
      actionsAvailable: {
        findMany: jest.fn(),
      },
    };

    service = new CreatAcTrigService(prismaServiceMock as any);
  });

  it("should return a list of actions in the correct format", async () => {
    const mockActions = [
      {
        name: "discordmsg",
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
              return: "body",
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
      },
    ];

    prismaServiceMock.actionsAvailable.findMany.mockResolvedValue(mockActions);

    const result = await service.getActions({} as any);

    expect(prismaServiceMock.actionsAvailable.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockActions);
  });
});
