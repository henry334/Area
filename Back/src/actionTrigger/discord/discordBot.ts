import { Injectable } from '@nestjs/common';
import { channel } from 'diagnostics_channel';
import { Client, IntentsBitField, TextChannel, Message } from 'discord.js';

@Injectable()
export class DiscordBot {
    public client: Client;
    private guilId: string = null;
    private isReady: boolean = false;

    private static instance: DiscordBot | null = null;

    constructor() {
        this.client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ]
        })

        this.client.on('ready', () => {
            console.log('Discord bot is running')
            this.isReady = true;
        })

        this.client.login(process.env.DISCORD_TOKEN)
    }

    public static getInstance(): DiscordBot {
        if (!DiscordBot.instance) {
            DiscordBot.instance = new DiscordBot();
        }
        return DiscordBot.instance;
    }

    public sendMessage(channelName, message): void {
        if (!this.isReady) {
            console.error('Discord bot is not ready yet.');
            return;
        }
        
        const guild = this.client.guilds.cache.get(this.guilId);
        if (!guild) return console.error('Guild not found.');

        const channel = guild.channels.cache.find(channel => channel.name === channelName);
        
        if (channel instanceof TextChannel) {
            channel.send(message);
        } else {
            console.error(`Channel with Name ${channelName} is not a text channel.`);
        }
    }
}
