import { Trigger, sleep } from '../trigger'
import { PrismaService } from 'prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { google, calendar_v3 } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { TriggerActionService } from '../actiontrigger.service';
import {GoogleUtils} from './google.utils' 

export default class NewGoogleDocDocument implements Trigger {
    public result: any[] = []
    private data = null
    private utils
    private storedDocumentIds: any[] = []
    private userId : string
    private drive = null

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

    public async listFiles(drive) {
        try {
            const response = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.document'",
            });
        
            const documents = response.data.files;
            return documents;
        } catch (error) {
            console.error('Error listing files:', error);
            const t = await this.utils.getNewAccessToken(this.userId)
            if (t.length == 0) {
                return []
            }
            var accessToken = t[0]

            this.oAuth2Client.setCredentials({ access_token: accessToken })
            this.drive = google.drive({
                version: 'v3',
                auth: this.oAuth2Client,
            });
            return [];
        }
    }

    private async loop(): Promise<void> {
        var firstTime = true
        while (true) {
            const documents = await this.listFiles(this.drive)
            for (const document of documents) {
                if (!this.storedDocumentIds.includes(document['id'])) {
                    this.storedDocumentIds.push(document['id'])
                    if (!firstTime) {
                        console.log('New Google Document: ' + document['name'])
                        this.result.push(document['name'])
                    }
                }
            }
            firstTime = false
            await sleep(this.data['time'] * 10000)
        }
    }

    private async init()  {
        const t = await this.utils.getAccessToken(this.userId)
        if (t.length == 0) {
            return
        }
        var accessToken = t[0]
        var refresh_token = t[1]
        var expirationDate = t[2]


        this.oAuth2Client.setCredentials({ access_token: accessToken })
        this.drive = google.drive({
            version: 'v3',
            auth: this.oAuth2Client,
        });
        try {
            this.loop()
        } catch (error) {
            console.log(error + "ERROR in google document")
        }
    }

    public async isTrigger(): Promise<any[]> {
        return this.result
    }

    public resetTrigger(): void {
        this.result = []
    }
}