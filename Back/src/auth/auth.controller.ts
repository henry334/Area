import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Register a new user
  // Register a new user
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user.
 *     description: Register a new user with the provided data.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *           required:
 *             - email
 *             - password
 *             - name
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Bad request, email already exists.
 */

  @Post('register')
  register(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.register(dto, req, res)
  }

  // Login a user
  // Login a user
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user.
 *     description: Log in a user with the provided credentials.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User login data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           required:
 *             - email
 *             - password
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Unauthorized, invalid credentials.
 */
  @Post('login')
  login(@Body() dto: LoginDto, @Res() res) {
    return this.authService.login(dto, res)
  }

  // Login an admin
  /**
 * @swagger
 * /auth/adminlogin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login as an admin.
 *     description: Log in as an admin with the provided credentials.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Admin login data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           required:
 *             - email
 *             - password
 *     responses:
 *       '200':
 *         description: Admin logged in successfully.
 *       '401':
 *         description: Unauthorized, invalid credentials.
 */
  @Post('adminlogin')
  loginAdmin(@Body() dto: LoginDto, @Res() res) {
    return this.authService.loginAdmin(dto, res)
  }

  // Logout
  /**
   * @swagger
   * /auth/logout:
   *   get:
   *     tags:
   *       - Auth
   *     summary: Logout a user.
   *     description: Log out the authenticated user.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: User logged out successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res)
  }

  // Get authenticated user's information
  /**
   * @swagger
   * /auth/me:
   *   get:
   *     tags:
   *       - Auth
   *     summary: Get authenticated user details.
   *     description: Retrieve details of the authenticated user.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: Successful response with user's details.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req) {
    return this.authService.Me(req)
  }

  // Change password for authenticated user
  /**
   * @swagger
   * /auth/changepswd:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Change password for authenticated user.
   *     description: Change the password for the authenticated user.
   *     security:
   *       - authorization: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Change password data
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             oldPassword:
   *               type: string
   *             newPassword:
   *               type: string
   *           required:
   *             - oldPassword
   *             - newPassword
   *     responses:
   *       '200':
   *         description: Password changed successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   *       '400':
   *         description: Bad request, old password is incorrect.
   */
  @Post('changepswd')
  @UseGuards(JwtAuthGuard)
  changePswd(@Body() dto, @Req() req) {
    return this.authService.changePswd(dto, req)
  }

  // Add a cookie (for testing purposes)
  /**
 * @swagger
 * /auth/cookie:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Add a cookie (for testing purposes).
 *     description: Add a cookie named 'authorization' with a Bearer token.
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK, cookie added successfully.
 */
  @Get('cookie')
  addcooo(@Res() res) {
    res.cookie('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiJiY2FkMTkxMC02NmMyLTRhMWItYmU3Ny1kZmZiNjQ1MDUzMDkiLCJpYXQiOjE2OTkyMjgyNzZ9.jnd3UmvWOgG7qjXVqUMbKRA1wZJ0dx0HjjxS6-NJW30')
    return res.send("OK")
  }
}
