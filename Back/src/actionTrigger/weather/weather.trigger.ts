import { Trigger, sleep } from '../trigger'
import { PrismaService } from 'prisma/prisma.service'

export default class WeatherApi implements Trigger {
    public result = []
    private api_key = null
    private data = null
    private lastvalue = null
    private isTriggered: boolean = false
    constructor(data : any, private prisma: PrismaService) {
        this.api_key = process.env.WEATHER_API_KEY
        this.data = data
        this.loop()
    }

    async loop(): Promise<void> {
        const askTemp = parseInt(this.data['temp'])
        while (true) {
            try {
                const url = `http://api.weatherapi.com/v1/current.json?key=${this.api_key}&q=${this.data['city']}&aqi=no`
                const res = await fetch(url, {
                    method: 'GET',
                })
                const r = await res.json()
                const temp = r['current']['temp_c']
                if (temp == this.lastvalue) {
                    await sleep(this.data['time'] * 10000)
                    continue
                }
                if (this.data['value'] == '>=' && temp >= askTemp) {
                    console.log("temp >= askTemp")
                    this.isTriggered = true
                }
                if (this.data['value'] == '=<' && temp <= askTemp) {
                    this.isTriggered = true
                }
                if (this.data['value'] == '=' && temp == askTemp) {
                    this.isTriggered = true
                }
                if (this.isTriggered) {
                    this.lastvalue = temp
                    this.isTriggered = false
                    this.result[0] = temp
                }
            } catch (e) {}
            await sleep(this.data['time'] * 10000)
        }
    }

    public async isTrigger(): Promise<any[]> {
        return this.result
    }

    public resetTrigger(): void {
        this.result = []
    }
}