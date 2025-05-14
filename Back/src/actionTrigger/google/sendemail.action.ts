import { Action } from '../action'
import { PrismaService } from 'prisma/prisma.service'
import {GoogleUtils} from './google.utils'

export default class GmailSend implements Action {
    private utils
    constructor(private prisma: PrismaService) {
        this.utils = new GoogleUtils(this.prisma)
    }

    public async startAction(data : any, userId : string, triggerResult : any) : Promise<void> {
        try {
            const subject = data['subject']
            var body = data['body']
            const recipient = data['recipient']
            const t = await this.utils.getAccessToken(userId)
            if (t.length == 0) {
                return
            }
            var access_token = t[0]
            var refresh_token = t[1]
            var expirationDate = t[2]
            if (Date.now() >= expirationDate) {
                console.log('Goole Token expired')
                const newData = await this.utils.getNewAccessToken(refresh_token , userId)
                if (newData.length == 0)
                    return
                access_token = newData[0]
                refresh_token = newData[1]
                expirationDate = newData[2]
            }

            const rawMessage = `To: ${recipient}\nSubject: ${subject}\n\n${body}`
            const messageData = {raw: Buffer.from(rawMessage).toString('base64')}
            const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            })
            if (response.status === 200)
                console.log('Email sent successfully!')
            else {
                console.log(response)
            }
        } catch (error) {
            console.log(error + "ERROR in send email")
        }
    }
}