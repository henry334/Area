import { PrismaService } from 'prisma/prisma.service'
export class GoogleUtils {
    constructor(private prisma: PrismaService) {}
    public async getNewAccessToken(refreshToken : string, userId : string): Promise<any[]> {
        console.log("goi getNewAccessToken")
        var newRefreshToken = null;
        var newAccessToken = null;
        var newExpirationDate = null
        const clientId = process.env.GOOGLE_CLIENT_ID
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET
        const tokenUrl = `https://oauth2.googleapis.com/token`
        const refreshTokenData = {
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        };
        try {
            const rep = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(refreshTokenData),
            })
            const data = await rep.json()
            newAccessToken = data['access_token']
            newRefreshToken = data['refresh_token']
            if (newAccessToken == null || newRefreshToken == null)
                return []
            const expiresIn = data['expires_in']
            const currentTimestamp = Date.now();
            const expirationTimestamp = currentTimestamp + expiresIn * 1000;
            newExpirationDate = new Date(expirationTimestamp).getTime();

            const existe = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Google', userId : userId}})
            await this.prisma.oauth2Data.update({where : {id : existe.id},
                data : {
                    data : {accessToken : newAccessToken, refreshToken : refreshToken, expirationDate : newExpirationDate}
                }
            })
            return [newAccessToken, newRefreshToken, newExpirationDate]
        } catch (e) {
            console.log(e + " Error in getNewAccessToken")
            return []
        }
    }

    public async getAccessToken(userId : string): Promise<any[]> {
        const oauth2dt = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Google', userId : userId}})
        if (!oauth2dt) {
            return [];
        }
        console.log(oauth2dt)
        var accessToken = oauth2dt['data']['accessToken']
        var refresh_token = oauth2dt['data']['refreshToken']
        var expirationDate = oauth2dt['data']['expirationDate']
        if (Date.now() >= expirationDate) {
            console.log('Google Token expired')
            const newData = await this.getNewAccessToken(refresh_token , userId)
            if (newData.length == 0)
                return []
            accessToken = newData[0]
            refresh_token = newData[1]
            expirationDate = newData[2]
        }
        return [accessToken, refresh_token, expirationDate]
    }
}