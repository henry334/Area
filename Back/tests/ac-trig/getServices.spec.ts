import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";

describe("CreatAcTrigService", () => {
  let service: CreatAcTrigService;
  let prismaServiceMock: { services: { findMany: jest.Mock } };

  beforeEach(() => {
    prismaServiceMock = {
      services: {
        findMany: jest.fn(),
      },
    };

    service = new CreatAcTrigService(prismaServiceMock as any);
  });

  it("should return a list of services", async () => {
    prismaServiceMock.services.findMany.mockResolvedValue([
      {
        name: "Discord",
        description:
          "Discord is a communication platform for creating communities, offering voice, video, and text channels, along with tools for moderation and integration with other services.",
        logo: "https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png",
        color: "#7289da",
        oauth2url: "http://localhost:8080/oauth2/discordbot/redirect",
      },
      {
        name: "EtherScan",
        description:
          "Etherscan is a blockchain explorer for the Ethereum network, enabling users to search and verify transactions, addresses, and other blockchain data in real-time.",
        logo: "https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
        color: "#6bb6e3",
        oauth2url: "",
      },
    ]);

    const result = await service.getServices();

    expect(prismaServiceMock.services.findMany).toHaveBeenCalled();
    expect(result).toEqual([
      {
        name: "Discord",
        description:
          "Discord is a communication platform for creating communities, offering voice, video, and text channels, along with tools for moderation and integration with other services.",
        logo: "https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png",
        color: "#7289da",
        oauth2url: "http://localhost:8080/oauth2/discordbot/redirect",
      },
      {
        name: "EtherScan",
        description:
          "Etherscan is a blockchain explorer for the Ethereum network, enabling users to search and verify transactions, addresses, and other blockchain data in real-time.",
        logo: "https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
        color: "#6bb6e3",
        oauth2url: "",
      },
    ]);
  });
});
