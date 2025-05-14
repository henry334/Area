import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDto, LoginDto } from './auth/dto/auth.dto';
import { JwtAuthGuard } from './auth/jwt.guard';
import { Request } from 'express';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * @openapi
     * /ping:
     *   get:
     *     summary: Check if the server is alive.
     *     responses:
     *       '200':
     *         description: Successful response with server information.
     */
    @Get('ping')
    ping() {
        return 'pong'
    }

    /**
     * @openapi
     * /about.json:
     *   get:
     *     summary: Get information about the server service, available actions, and triggers.
     *     description: Retrieve detailed information about the server and its capabilities.
     *     responses:
     *       '200':
     *         description: Successful response with server information.
     */
    @Get('about.json')
    aboutJson(@Req() req) {
        return this.appService.aboutJson(req)
    }
}