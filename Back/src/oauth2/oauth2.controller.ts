import { Body, Controller, Get, Post, Param, Res, Req, Query, UseGuards } from '@nestjs/common';
import { Oauth2Service } from './oauth2.service'
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('oauth2')
@Controller('oauth2')
export class Oauth2Controller {
  constructor(private readonly oauth2Service: Oauth2Service) {}

  // Callback for Discord bot OAuth2
  /**
   * @swagger
   * /oauth2/discordbot/callback:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Callback for Discord bot OAuth2.
   *     description: Callback endpoint for Discord bot OAuth2.
   *     parameters:
   *       - in: query
   *         name: code
   *         required: true
   *         description: OAuth2 code.
   *         type: string
   *       - in: query
   *         name: guild_id
   *         required: true
   *         description: Discord guild ID.
   *         type: string
   *       - in: query
   *         name: state
   *         required: true
   *         description: User ID.
   *         type: string
   *     responses:
   *       '200':
   *         description: OAuth2 callback success.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('discordbot/callback')
  callback(@Query('code') code: string, @Query('guild_id') guild_id: string, @Query('state') userId: string, @Req() req, @Res() res) {
    return this.oauth2Service.callback(code, res, req, guild_id, userId);
  }

  // Redirect for Discord bot OAuth2
  /**
   * @swagger
   * /oauth2/discordbot/redirect:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Redirect for Discord bot OAuth2.
   *     description: Redirect endpoint for Discord bot OAuth2.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: OAuth2 redirect success.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('discordbot/redirect')
  @UseGuards(JwtAuthGuard)
  redirect(@Res() res, @Req() req) {
    return this.oauth2Service.redirec(res, req);
  }

  // Callback for Microsoft OAuth2
  /**
   * @swagger
   * /oauth2/microsoft/callback:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Callback for Microsoft OAuth2.
   *     description: Callback endpoint for Microsoft OAuth2.
   *     parameters:
   *       - in: query
   *         name: code
   *         required: true
   *         description: OAuth2 code.
   *         type: string
   *       - in: query
   *         name: state
   *         required: true
   *         description: User ID.
   *         type: string
   *     responses:
   *       '200':
   *         description: OAuth2 callback success.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('microsoft/callback')
  microsoftCallback(@Query('code') code: string, @Query('state') userId: string, @Req() req, @Res() res) {
    const redirectUri = process.env.MICROSOFT_CALLBACK_URL;
    return this.oauth2Service.microsoftCallback(code, res, req, userId, redirectUri)
  }

  // Redirect for Microsoft OAuth2
  /**
   * @swagger
   * /oauth2/microsoft/redirect:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Redirect for Microsoft OAuth2.
   *     description: Redirect endpoint for Microsoft OAuth2.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: OAuth2 redirect success.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('microsoft/redirect')
  @UseGuards(JwtAuthGuard)
  microsoftRedirect(@Res() res, @Req() req) {
    const redirectUri = process.env.MICROSOFT_CALLBACK_URL;
    return this.oauth2Service.microsoftRedirect(res, req, redirectUri);
  }

  // Callback for Google OAuth2
  /**
   * @swagger
   * /oauth2/google/callback:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Callback for Google OAuth2.
   *     description: Callback endpoint for Google OAuth2.
   *     parameters:
   *       - in: query
   *         name: code
   *         required: true
   *         description: OAuth2 code.
   *         type: string
   *       - in: query
   *         name: state
   *         required: true
   *         description: User ID.
   *         type: string
   *     responses:
   *       '200':
   *         description: OAuth2 callback success.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('google/callback')
  googleCallback(@Query('code') code: string, @Query('state') userId: string, @Req() req, @Res() res) {
    return this.oauth2Service.googleCallback(code, res, req, userId)
  }
  // Redirect for Google OAuth2
  /**
   * @swagger
   * /oauth2/google/redirect:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Redirect for Google OAuth2.
   *     description: Redirect endpoint for Google OAuth2.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: OAuth2 redirect success.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('google/redirect')
  @UseGuards(JwtAuthGuard)
  googleRedirect(@Res() res, @Req() req) {
    return this.oauth2Service.googleRedirect(res, req);
  }

  // Get OAuth2 Data by name
  /**
   * @swagger
   * /oauth2/oauth2data/{name}:
   *   get:
   *     tags:
   *       - Oauth2
   *     summary: Get OAuth2 data by name.
   *     description: Retrieve OAuth2 data by name.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         description: Name of the OAuth2 data.
   *         type: string
   *     responses:
   *       '200':
   *         description: Successful response with OAuth2 data.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get('oauth2data/:name')
  @UseGuards(JwtAuthGuard)
  async getOauth2Data(@Param('name') name: string, @Req() req) {
    return this.oauth2Service.getOauth2Data(name, req);
  }
}
