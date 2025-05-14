import { Trigger } from '../trigger'
import {DiscordBot} from './discordBot'
import { TextChannel } from 'discord.js';

export default class DiscordPinnedMsg implements Trigger {
    private discordbot = null
    public result = []
    constructor(data : any) {
        this.discordbot = DiscordBot.getInstance()
        this.discordbot.client.on('messageUpdate', (oldMessage, newMessage) => {
            if ((newMessage.pinned && newMessage.guild.id == data.guildId) || (oldMessage.pinned && oldMessage.guild.id == data.guildId)) {
                console.log(`Message ${newMessage.id} was pinned in channel ${newMessage.channel.id}`);
                this.result.push(newMessage)
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