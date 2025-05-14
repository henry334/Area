import { CanActivate, ExecutionContext, Injectable, Req, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import { request } from 'http';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.isAdmin(request.user.email);
  }

  async isAdmin(email: string) {
    const foundUser = await this.prismaService.users.findUnique({where : {email}})
    if (!foundUser) {
        throw new BadRequestException("email doesnt exists")
    }
    if (foundUser.authority === 'admin')
        return true
        throw new ForbiddenException("You do not have the necessary authority (admin)");
  }

}
