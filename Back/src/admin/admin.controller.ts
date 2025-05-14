import { Controller, Get, Req, Put, Param, UseGuards, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Get all users
   *
   * @swagger
   * /admin/users:
   *   get:
   *     tags:
   *       - Admin
   *     summary: Get all users.
   *     description: Retrieve all users.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: Successful response with all users.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("users")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getUsers(@Req() req) {
    return await this.adminService.getUsers()
  }

  /**
   * Delete a user by email
   *
   * @swagger
   * /admin/userdel/{email}:
   *   delete:
   *     tags:
   *       - Admin
   *     summary: Delete a user by email.
   *     description: Delete a user with the specified email.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: Email of the user to delete.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: User deleted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Delete("userdel/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.deleteUser(req, email)
  }

  /**
   * Promote a user by email
   *
   * @swagger
   * /admin/promote/{email}:
   *   put:
   *     tags:
   *       - Admin
   *     summary: Promote a user by email.
   *     description: Promote a user with the specified email.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: Email of the user to promote.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: User promoted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Put("promote/:email")
  @UseGuards(JwtAuthGuard)
  async promoteUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.promoteUser(req, email)
  }

   /**
   * Demote a user by email
   *
   * @swagger
   * /admin/demote/{email}:
   *   put:
   *     tags:
   *       - Admin
   *     summary: Demote a user by email.
   *     description: Demote a user with the specified email.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: Email of the user to demote.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: User demoted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Put("demote/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async demoteUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.demoteUser(req, email)
  }

  /**
   * Ban a user by email
   *
   * @swagger
   * /admin/ban/{email}:
   *   put:
   *     tags:
   *       - Admin
   *     summary: Ban a user by email.
   *     description: Ban a user with the specified email.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: Email of the user to ban.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: User banned successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Put("ban/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async banUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.banUser(req, email)
  }

  /**
   * Unban a user by email
   *
   * @swagger
   * /admin/unban/{email}:
   *   put:
   *     tags:
   *       - Admin
   *     summary: Unban a user by email.
   *     description: Unban a user with the specified email.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         description: Email of the user to unban.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: User unbanned successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Put("unban/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async unbanUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.unbanUser(req, email)
  }
}
