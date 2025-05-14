import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async getUsers() {
        return await this.prisma.users.findMany()
    }

    async deleteUser(req, email : string) {
        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (!foundUser) {
            throw new BadRequestException("email doesnt exists")
        }
        await this.prisma.users.delete({ where: { email } })
        return {'message' : 'user deleted'}
    }

    async promoteUser(req, email : string) {
        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (!foundUser) {
            throw new BadRequestException("email doesnt exists")
        }
        await this.prisma.users.update({where : {email}, data : {authority : 'admin'}})
        return {'message' : 'user promoted'}
    }

    async demoteUser(req, email : string) {
        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (!foundUser) {
            throw new BadRequestException("email doesnt exists")
        }
        await this.prisma.users.update({where : {email}, data : {authority : 'user'}})
        return {'message' : 'user demoted'}
    }

    async banUser(req, email : string) {
        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (!foundUser) {
            throw new BadRequestException("email doesnt exists")
        }
        // await this.prisma.users.delete({ where: { email } })
        await this.prisma.banUsers.create({data : {banEmail : email}})
        return {'message' : 'user banned'}
    }

    async unbanUser(req, banEmail : string) {
        const foundUser = await this.prisma.banUsers.findUnique({where : {banEmail}})
        if (!foundUser) {
            throw new BadRequestException("email is not ban")
        }
        await this.prisma.banUsers.delete({ where: { banEmail }})
        return {'message' : 'user unbanned'}
    }
}
