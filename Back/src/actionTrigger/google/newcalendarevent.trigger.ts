import { Trigger, sleep } from '../trigger'
import { PrismaService } from 'prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { google, calendar_v3 } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { TriggerActionService } from '../actiontrigger.service';
import {GoogleUtils} from './google.utils'

export default class PinNewEvent implements Trigger {
    public result: any[] = []
    private myCalendar =  new Map()
    private data = null
    private utils
    private calendar = null
    private userId : string
    private oAuth2Client = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_SECRET,
        clientSecret: process.env.GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_CALLBACK_URL,
    });

    constructor(data: any, userId : string, private prisma: PrismaService, private triggeractionserv: TriggerActionService) {
        this.data = data
        this.utils = new GoogleUtils(this.prisma)
        this.userId = userId
        this.init()
    }

    private async loop(): Promise<void> {
        await sleep(1000)
        while (true) {
            const r = ['\n']
            try {
                const events = await this.calendar.events.list({
                    calendarId: 'primary',
                })
                events.data.items.forEach(element => {
                    if (!this.myCalendar.has(element['id'])) {
                        this.myCalendar.set(element['id'], element['summary'])
                        r[0] = r[0] + '-Event: ' + element['summary'] + '\n'
                    }
                })
                if (r[0] != '\n')
                   this.result = r
                await sleep(this.data['time'] * 10000)
            } catch (error) {
                const t = await this.utils.getNewAccessToken(this.userId)
                if (t.length == 0) {
                    return
                }
                var accessToken = t[0]
                this.oAuth2Client.setCredentials({ access_token: accessToken })
                this.calendar = google.calendar({ version: 'v3', auth: this.oAuth2Client })
            }
        }
    }

    private async init(): Promise<void> {
        const t = await this.utils.getAccessToken(this.userId)
        if (t.length == 0) {
            return
        }
        var accessToken = t[0]
        var refresh_token = t[1]
        var expirationDate = t[2]

        this.oAuth2Client.setCredentials({ access_token: accessToken })
        this.calendar = google.calendar({ version: 'v3', auth: this.oAuth2Client })
        
        try {
            const events = await this.calendar.events.list({
                calendarId: 'primary',
            })
            events.data.items.forEach(element => {
                this.myCalendar.set(element['id'], element['summary'])
            })
            this.loop()
        } catch (error) {
            console.log(error + " ERROR in calender")
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