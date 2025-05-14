import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './auth/dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {swaggerDoc} from './swagger'
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Injectable()
@ApiTags('cats')
export class AppService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async aboutJson(req: Request) {
        const services = await this.prisma.services.findMany({})
        const triggers = await this.prisma.triggersAvailable.findMany({})
        const actions = await this.prisma.actionsAvailable.findMany({})

        var l = 0
        var displayServices = []
        services.forEach(element => {
            var triggerAv = []
            var actionAv = []
            triggers.forEach(trigger => {
                if (trigger.serviceName == element.name) {
                    triggerAv.push({name : trigger['name'], description : trigger['description']})
                }
            })
            actions.forEach(action => {
                if (action.serviceName == element.name) {
                    actionAv.push({name : action['name'], description : action['description']})
                }
            })
            displayServices.push({
                name: element.name,
                actions: actionAv,
                reactions: triggerAv
            });
        });
        return {
            client :{
                host: req.ip
            },
            server : {
                current_time : Math.floor(Date.now() / 1000),
                services : displayServices
            }
        }
    }
}