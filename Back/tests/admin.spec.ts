import { BadRequestException } from '@nestjs/common';
import { AdminService } from '../src/admin/admin.service';
const mockPrismaService = {
  users: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
  banUsers: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

const mockJwtService = {};

describe('AdminService', () => {
  let adminService: AdminService;

  beforeEach(() => {
    adminService = new AdminService(mockPrismaService as any, mockJwtService as any);
  });

  describe('getUsers', () => {
    it('should return users from PrismaService', async () => {
      const mockUsers = [{ id: 1, email: 'test@example.com' }];
      mockPrismaService.users.findMany.mockResolvedValue(mockUsers);

      const result = await adminService.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockPrismaService.users.findMany).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete user and return success message', async () => {
      const mockEmail = 'test@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue({ email: mockEmail });

      const result = await adminService.deleteUser({}, mockEmail);

      expect(result).toEqual({ message: 'user deleted' });
      expect(mockPrismaService.users.delete).toHaveBeenCalledWith({ where: { email: mockEmail } });
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const mockEmail = 'nonexistent@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      await expect(adminService.deleteUser({}, mockEmail)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('promoteUser', () => {
    it('should promote user and return success message', async () => {
      const mockEmail = 'test@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue({ email: mockEmail });

      const result = await adminService.promoteUser({}, mockEmail);

      expect(result).toEqual({ message: 'user promoted' });
      expect(mockPrismaService.users.update).toHaveBeenCalledWith({
        where: { email: mockEmail },
        data: { authority: 'admin' },
      });
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const mockEmail = 'nonexistent@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      await expect(adminService.promoteUser({}, mockEmail)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('demoteUser', () => {
    it('should demote user and return success message', async () => {
      const mockEmail = 'test@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue({ email: mockEmail });

      const result = await adminService.demoteUser({}, mockEmail);

      expect(result).toEqual({ message: 'user demoted' });
      expect(mockPrismaService.users.update).toHaveBeenCalledWith({
        where: { email: mockEmail },
        data: { authority: 'user' },
      });
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const mockEmail = 'nonexistent@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      await expect(adminService.demoteUser({}, mockEmail)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('banUser', () => {
    it('should ban user and return success message', async () => {
      const mockEmail = 'test@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue({ email: mockEmail });

      const result = await adminService.banUser({}, mockEmail);

      expect(result).toEqual({ message: 'user banned' });
      expect(mockPrismaService.banUsers.create).toHaveBeenCalledWith({
        data: { banEmail: mockEmail },
      });
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const mockEmail = 'nonexistent@example.com';
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      await expect(adminService.banUser({}, mockEmail)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('unbanUser', () => {
    it('should unban user and return success message', async () => {
      const mockBanEmail = 'test@example.com';
      mockPrismaService.banUsers.findUnique.mockResolvedValue({ banEmail: mockBanEmail });

      const result = await adminService.unbanUser({}, mockBanEmail);

      expect(result).toEqual({ message: 'user unbanned' });
      expect(mockPrismaService.banUsers.delete).toHaveBeenCalledWith({
        where: { banEmail: mockBanEmail },
      });
    });

    it('should throw BadRequestException if user is not banned', async () => {
      const mockBanEmail = 'nonexistent@example.com';
      mockPrismaService.banUsers.findUnique.mockResolvedValue(null);

      await expect(adminService.unbanUser({}, mockBanEmail)).rejects.toThrowError(BadRequestException);
    });
  });
});
