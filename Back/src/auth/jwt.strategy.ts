import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    private static extractJWT(req: Request) {
        if (req.cookies && 'authorization' in req.cookies) {
            return req.cookies['authorization'].replace('Bearer ', '')
        } else if ('authorization' in req.headers) {
            return req.headers.authorization.replace('Bearer ', '')
        }
        return null
    }

    async validate(payload: any) {
        return { id: payload.id, email: payload.email };
    }
}