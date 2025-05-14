import { Action } from '../action'
import { PrismaService } from 'prisma/prisma.service'
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import {GoogleUtils} from './google.utils'

export default class GmailSend implements Action {
    private utils
    constructor(private prisma: PrismaService) {
        this.utils = new GoogleUtils(this.prisma)
    }

    public async startAction(data : any, userId : string, triggerResult : any) : Promise<void> {
        try {
            var body = data['body']
            const t = await this.utils.getAccessToken(userId)
            if (t.length == 0) {
                return
            }
            var access_token = t[0]
            var refresh_token = t[1]
            var expirationDate = t[2]
            if (Date.now() >= expirationDate) {
                console.log('Google Token expired')
                const newData = await this.utils.getNewAccessToken(refresh_token , userId)
                if (newData.length == 0)
                    return
                access_token = newData[0]
                refresh_token = newData[1]
                expirationDate = newData[2]
            }
            
            const oAuth2Client = new google.auth.OAuth2();
            oAuth2Client.setCredentials({ access_token: access_token });
            const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
            const startDate = data['startDate']
            const startHour = data['startHour']
            const endDate = data['endDate']
            const endHour = data['endHour']
            const event = {
                summary: body,
                start: {
                    //'2023-10-20T12:00:00'
                    dateTime: startDate + 'T' + startHour + ':00',
                    timeZone: 'Europe/Madrid',
                },
                end: {
                    dateTime: endDate + 'T' + endHour + ':00',
                    timeZone: 'Europe/Madrid',
                },
            };

            try {
                const response = await calendar.events.insert({
                  calendarId: 'primary',
                  requestBody: event,
                });
            
              } catch (error) {
                console.error('Error creating event:', error);
              }

        } catch (error) {
            console.log(error)
        }
    }
}