import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: AuthDto, req: Request, res: Response) {
        const {email, password, username} = dto

        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (foundUser) {
            throw new BadRequestException("email already exists")
        }
        const hashedPassword = await this.hashPassword(password)

        const user = await this.prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username,
                authority: "user"
            }
        })

        const bearer = await this.jwtToken(email, user.id)
        if (!bearer) {
            throw new ForbiddenException
        }

        res.cookie('authorization', "Bearer " + bearer, {httpOnly: true, sameSite: 'strict', secure: true})

        res.send({Bearer: bearer}).status(200)
    }

    async login(dto: LoginDto, res: Response) {
        const {email, password} = dto

        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (!foundUser) {
            throw new BadRequestException("Wrong creditential!")
        }
        const isBan = await this.prisma.banUsers.findUnique({where : {banEmail : email}})
        if (isBan) {
            throw new BadRequestException("You are banned!")
        }
        const isMatch = await this.comparePassword(password, foundUser.password)
        if (!isMatch) {
            throw new BadRequestException("Wrong creditential!")
        }

        const bearer = await this.jwtToken(email, foundUser.id)
        if (!bearer) {
            throw new ForbiddenException
        }

        res.cookie('authorization', "Bearer " + bearer, {httpOnly: true, sameSite: 'strict', secure: true})

        res.send({Bearer: bearer}).status(200)
    }

    async loginAdmin(dto: LoginDto, res: Response) {
        const {email, password} = dto

        const foundUser = await this.prisma.users.findUnique({where : {email}})
        if (!foundUser) {
            throw new BadRequestException("Wrong creditential!")
        }
        if (foundUser.authority != "admin") {
            throw new BadRequestException("Not admin!")
        }
        const isBan = await this.prisma.banUsers.findUnique({where : {banEmail : email}})
        if (isBan) {
            throw new BadRequestException("You are banned!")
        }
        const isMatch = await this.comparePassword(password, foundUser.password)
        if (!isMatch) {
            throw new BadRequestException("Wrong creditential!")
        }

        const bearer = await this.jwtToken(email, foundUser.id)
        if (!bearer) {
            throw new ForbiddenException
        }

        res.cookie('authorization', "Bearer " + bearer, {httpOnly: true, sameSite: 'strict', secure: true})

        res.send({Bearer: bearer}).status(200)
    }
    
    async logout(req: Request, res: Response) {
        res.clearCookie('authorization')
        return {message: "Logout successfully"}
    }

    async changePswd(dto, req) {
        const {oldpassword, newpassword} = dto
        const email = req.user.email

        const foundUser = await this.prisma.users.findUnique({where : {email: email}})
        if (!foundUser) {
            throw new BadRequestException("Wrong creditential!1")
        }

        const isMatch = await this.comparePassword(oldpassword, foundUser.password)
        if (!isMatch) {
            throw new BadRequestException("Wrong creditential!")
        }

        const hashedPassword = await this.hashPassword(newpassword)

        await this.prisma.users.update({
            where: {email: email},
            data: {
                password: hashedPassword
            }
        })

        return {message: "Password changed successfully"}
    }

    async Me(req: Request) {
        const userinfo = req.user
        const user = await this.prisma.users.findUnique({where: {id: userinfo['id']}})
        if (!user) {
            throw new BadRequestException("User not found")
        }
        return user
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10
        return await bcrypt.hash(password, saltOrRounds)
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }

    async jwtToken(email: string , id: string) {
        return this.jwt.signAsync({email, id}, {secret: process.env.JWT_SECRET})
    }
}
