import { Injectable, BadRequestException } from '@nestjs/common';
import {Response, Request} from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import * as msal from '@azure/msal-node';
import { AuthorizationCode } from 'simple-oauth2';

@Injectable()
export class Oauth2Service {
    private clientId
    private clientSecret
    private tenantId
    private scope = 'openid profile offline_access User.Read Mail.Send Mail.Read'
    private googleScope = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/drive'].join(' ')

    constructor(private prisma: PrismaService) {
        this.clientId = process.env.MICROSOFT_CLIENT_ID;
        this.clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
        this.tenantId = process.env.MICROSOFT_TENANT_ID;
    }
    
    async callback(code : string, res : Response, req : Request, guild_id : string, userId : string) {
        const clientId = process.env.DISCORD_CLIENT_ID;
        const clientSecret = process.env.DISCORD_CLIENT_SECRET;
        const redirectUri = process.env.DISCORD_CALLBACK_URL;

        try {
            const response = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
            });
            const data = await response.json()
            const guildName = data['guild']['name']
            const accessToken = data.access_token;
            const userexiste = await this.prisma.users.findUnique({where : {id : userId}})
            if (!userexiste) {
                return res.status(500).send('Authentication failed.');
            }
            const existe = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Discord', userId : userId}})
            if (!existe) {
                await this.prisma.oauth2Data.create({
                    data : {
                        userId : userId,
                        serviceName : 'Discord',
                        data : {
                            accessToken : accessToken,
                            guildId : [{render : guildName, return : guild_id}],
                            code : code
                        }
                    }
                })
            } else {
                for (const obj of existe.data['guildId']) {
                    if (obj.render === guildName)
                        return res.status(200).send('Authentication successful! Please return to the bot.');
                }
            
                await this.prisma.oauth2Data.update({where : {id : existe.id},
                    data : {
                        data : {
                            accessToken : accessToken,
                            guildId : [{render : guildName, return : guild_id}, ...existe.data['guildId'] ],
                            code : code
                        }
                    }
                })
            }
            res.status(200).send('Authentication successful! Please return to the bot.');
        } catch (error) {
            res.status(500).send('Authentication failed.');
        }
    }

    async redirec(res : Response, req : Request) {
        const clientId = process.env.DISCORD_CLIENT_ID;
        const redirectUri = process.env.DISCORD_CALLBACK_URL;
        const scopes = ['identify', 'email', 'bot', 'applications.commands'];
        const userId = req.user['id']

        const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join('%20')}&state=${userId}`;
            
        res.redirect(discordOAuthUrl);
    }

    async microsoftCallback(code : string, res : Response, req : Request, userId : string, redirectUri : string) {
        const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`
        const token_data = {
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'code': code,
            'redirect_uri': redirectUri,
            'grant_type': 'authorization_code'
        }
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(token_data),
        })
        try {
            const responseData = await response.json()
           
            const expiresIn = responseData['expires_in']
            const currentTimestamp = Date.now();
            const expirationTimestamp = currentTimestamp + expiresIn * 1000;
            const expirationDate = new Date(expirationTimestamp).getTime();

            const access_token = responseData['access_token']
            const refresh_token = responseData['refresh_token']
            const existe = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Microsoft', userId : userId}})
            if (!existe) {
                await this.prisma.oauth2Data.create({
                    data : {
                        userId : userId,
                        serviceName : 'Microsoft',
                        data : {accessToken : access_token, refreshToken : refresh_token, expirationDate : expirationDate}
                    }
                })
            } else {
                await this.prisma.oauth2Data.update({where : {id : existe.id},
                    data : {
                        data : {accessToken : access_token, refreshToken : refresh_token, expirationDate : expirationDate}
                    }
                })
            }
            res.send("Connected to Microsoft!")
            return access_token
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async microsoftRedirect(res : Response, req : Request, redirectUri : string) {
        const userId = req.user['id']
        const authUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize`
        const params = {
            client_id: this.clientId,
            response_type: 'code',
            redirect_uri: redirectUri,
            scope: this.scope,
            state: userId
        };

        const queryParams = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
        const authRedi = `${authUrl}?${await queryParams}`
        res.redirect(authRedi)
    }

    private oauth2 = new AuthorizationCode({
        client: {
          id: process.env.GOOGLE_CLIENT_ID,
          secret: process.env.GOOGLE_CLIENT_SECRET
        },
        auth: {
          tokenHost: 'https://accounts.google.com',
          tokenPath: '/o/oauth2/token',
          authorizePath: '/o/oauth2/auth'
        }
    })
      

    async googleCallback(code : string, res : Response, req : Request, userId : string) {
        const tokenParams = {
            code: req.query.code as string,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            scope: this.googleScope
        }
        
        try {
            const result = await this.oauth2.getToken(tokenParams);
            console.log('The resulting token: ', result.token)
            const access_token = result.token.access_token;
            const refresh_token = result.token.refresh_token;
            const expirationDate = new Date(result.token.expires_at).getTime();

            console.log("--------------------")
            console.log(access_token)
            console.log(refresh_token)
            console.log(expirationDate)
            console.log("--------------------")

            const existe = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Google', userId : userId}})
            if (!existe) {
                console.log("create")
                await this.prisma.oauth2Data.create({
                    data : {
                        userId : userId,
                        serviceName : 'Google',
                        data : {accessToken : access_token, refreshToken : refresh_token, expirationDate : expirationDate}
                    }
                })
            } else {
                console.log("update: "+ userId + " - " + existe.id)
                await this.prisma.oauth2Data.update({where : {id : existe.id},
                    data : {
                        data : {accessToken : access_token, refreshToken : refresh_token, expirationDate : expirationDate}
                    }
                })
            }
        
            res.send('Authentication successful! Tokens received.');
        } catch (error) {
            console.error('Error fetching access token:', error.message);
            res.status(500).send('Error fetching access token');
        }
    }

    async googleRedirect(res : Response, req : Request) {
        const authorizationUri = this.oauth2.authorizeURL({
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            scope: this.googleScope,
            state : req.user['id'],
            access_type: 'offline'
        })
        res.redirect(authorizationUri)
    }

    async getOauth2Data(name : string, req : Request) {
        const e = await this.prisma.oauth2Data.findFirst({where : {serviceName : name, userId : req.user['id']}})
        if (!e) {
            throw new BadRequestException("oauth2 data dont existe")
        }
        if (e.userId != req.user['id']) {
            throw new BadRequestException("oauth2 dont belong to you")
        }
        return e.data
    }

}
