import { CreatAcTrigService } from "../../src/ac-trig/creat-ac-trig.service";

describe("CreatAcTrigService", () => {
  let service: CreatAcTrigService;
  let prismaServiceMock: {
    services: { findUnique: jest.Mock; create: jest.Mock };
  };

  beforeEach(() => {
    prismaServiceMock = {
      services: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    service = new CreatAcTrigService(prismaServiceMock as any);
  });

  it("should add a new service and return serviceId", async () => {
    const dto = {
      name: "Discord",
      logo: "assets/discord.xml",
      color: "#7289da",
      description:
        "Discord is a voice, video and text communication service to talk and hang out with your friends and communities.",
      oauth2url: "http://localhost:8080/oauth2/discordbot/redirect",
    };

    prismaServiceMock.services.findUnique.mockResolvedValue(null);
    prismaServiceMock.services.create.mockResolvedValue({ id: "1" });

    const result = await service.addService(dto, {} as any);

    expect(prismaServiceMock.services.findUnique).toHaveBeenCalledWith({
      where: { name: "Discord" },
    });
    expect(prismaServiceMock.services.create).toHaveBeenCalledWith({
      data: {
        name: "Discord",
        logo: "assets/discord.xml",
        color: "#7289da",
        description:
          "Discord is a voice, video and text communication service to talk and hang out with your friends and communities.",
        oauth2url: "http://localhost:8080/oauth2/discordbot/redirect",
      },
    });
    expect(result).toEqual({ serviceId: "1" });
  });

  it("should throw BadRequestException if service already exists", async () => {
    const dto = {
      name: "Discord",
      logo: "assets/discord.xml",
      color: "#7289da",
      description:
        "Discord is a voice, video and text communication service to talk and hang out with your friends and communities.",
      oauth2url: "http://localhost:8080/oauth2/discordbot/redirect",
    };

    prismaServiceMock.services.findUnique.mockResolvedValue({ id: "1" });

    await expect(service.addService(dto, {} as any)).rejects.toThrowError(
      "Service already exists!"
    );
  });
});
