import { Trigger, sleep } from '../trigger'
import { PrismaService } from 'prisma/prisma.service'
import { MicrosoftUtils } from './utils.class';

export default class CheckEmail implements Trigger {
    private map = new Map();
    private utils
    public result = ["\n"]
    constructor(data : any, userId : string, private prisma: PrismaService) {
        this.utils = new MicrosoftUtils(this.prisma)
        this.loop(data, userId)
    }

    public async loop(data : any, userId : string): Promise<void> {
        var accessToken = null;
        var expirationDate = null
        var refresh_token = null
        const oauth2dt = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Microsoft', userId : userId}})
        if (!oauth2dt) {
            return;
        }
        accessToken = oauth2dt['data']['accessToken']
        refresh_token = oauth2dt['data']['refreshToken']
        expirationDate = oauth2dt['data']['expirationDate']

        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const day = String(currentDate.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`

        while (true) {
            try {
                if (Date.now() >= expirationDate) {
                    console.log('Micorsof Token expired')
                    const newData = await this.utils.getNewAccessToken(refresh_token , userId)
                    accessToken = newData[0]
                    refresh_token = newData[1]
                    expirationDate = newData[2]
                }
                const url = `https://graph.microsoft.com/v1.0/me/messages?$filter=isRead eq false and receivedDateTime ge ${formattedDate}T00:00:00Z and receivedDateTime lt ${formattedDate}T23:59:59Z`
                const req = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const r = await req.json()
                const emails = r['value']
                if (req.status === 200 && emails != null) {
                    for (let i = 0; i < emails.length; i++) {
                        const email = emails[i]
                        if (this.map.has(email['id']))
                            continue
                        this.map.set(email['id'], email['body']['content'])
                        this.result[0] = this.result[0] + `-${i}- ` + email['subject'] + " From '" + email['sender']['emailAddress']['address'] +"'\n"
                    }
                }
            } catch (e) {console.log("error in microsoft checkemail")}
            await sleep(data['time'] * 10000)
        }
    }

    public async isTrigger(): Promise<any[]> {
        if (this.result[0] == "\n")
            return []
        return this.result
    }

    public resetTrigger(): void {
        this.result = []
    }
}