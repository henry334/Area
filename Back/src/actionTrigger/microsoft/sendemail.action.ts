import { Action } from '../action'
import { PrismaService } from 'prisma/prisma.service'
import { MicrosoftUtils } from './utils.class';

export default class MicrosoftSendEmail implements Action {
    private utils
    constructor(private prisma: PrismaService) {
        this.utils = new MicrosoftUtils(this.prisma)
    }
    async startAction(data: any, userId : string, triggerResult : any): Promise<void> {
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
      
        if (Date.now() >= expirationDate) {
          console.log('Micorsof Token expired')
          const newData = await this.utils.getNewAccessToken(refresh_token , userId)
          accessToken = newData[0]
          refresh_token = newData[1]
          expirationDate = newData[2]
        }

        var body = data['body']
        const emailData = {
            message: {
              subject: data['subject'],
              body: {
                contentType: 'Text',
                content: body,
              },
              toRecipients: [
                {
                  emailAddress: {
                    address: data['recipient'],
                  },
                },
              ],
            },
        }
    try {
      const url = 'https://graph.microsoft.com/v1.0/me/sendMail';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })
    } catch (e) {console.log("error in microsoft sendemail")}
  }
}