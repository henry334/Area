import { Trigger } from '../trigger'
import {DiscordBot} from './discordBot'
import { TextChannel, Message } from 'discord.js';

export default class DiscordPinnedMsg implements Trigger {
    private discordbot = null
    public result = []
    constructor(data : any) {
        this.discordbot = DiscordBot.getInstance()
        this.discordbot.client.on('messageCreate', (message: Message) => {
           if (message.content.includes(data['message'])) {
                this.result.push(message.content)
           }
        })
    }

    public async isTrigger(): Promise<any[]> {
        return this.result
    }

    public resetTrigger(): void {
        this.result = []
    }

}