import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { Request } from 'express';

@Injectable()
export class TriggerActionService {
}