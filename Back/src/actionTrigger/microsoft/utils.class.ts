import { PrismaService } from 'prisma/prisma.service'
export class MicrosoftUtils {
    constructor(private prisma: PrismaService) {}
    public async getNewAccessToken(refreshToken : string, userId : string): Promise<any[]> {
        console.log("goi getNewAccessToken")
        var newRefreshToken = null;
        var newAccessToken = null;
        var newExpirationDate = null
        const clientId = process.env.MICROSOFT_CLIENT_ID
        const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
        const tenantId = process.env.MICROSOFT_TENANT_ID
        const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
        const refreshTokenData = {
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        };
        const rep = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(refreshTokenData),
        })
        try {
            const data = await rep.json()
            newAccessToken = data['access_token']
            newRefreshToken = data['refresh_token']
            const expiresIn = data['expires_in']
            const currentTimestamp = Date.now();
            const expirationTimestamp = currentTimestamp + expiresIn * 1000;
            newExpirationDate = new Date(expirationTimestamp).getTime();

            const existe = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Microsoft', userId : userId}})
            await this.prisma.oauth2Data.update({where : {id : existe.id},
                data : {
                    data : {accessToken : newAccessToken, refreshToken : refreshToken, expirationDate : newExpirationDate}
                }
            })

        } catch (e) {
            console.log(e)
            return []
        }
        return [newAccessToken, newRefreshToken, newExpirationDate]
    }
}