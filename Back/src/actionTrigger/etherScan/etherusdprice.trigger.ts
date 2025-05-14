import { Trigger, sleep } from '../trigger'

export default class EtherScanPrice implements Trigger {
    public isTriggered : boolean = false
    private data : any = {}
    private api_key
    public result = []
    private last_price = null
    constructor(data : any) {
        this.api_key = process.env.ETHERSCAN_API_KEY
        this.data = data;
        this.loop()
    }

    private async loop(): Promise<void> {
        const ethPrice = parseInt(this.data['ethPrice'])
        while (true) {
            try {
                const res = await fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + this.api_key)
                if (res.status !== 200) {
                    await sleep(this.data['time'] * 10000)
                    continue
                }
                const resjson = await res.json()
                if (resjson.result['ethusd'] == this.last_price) {
                    await sleep(this.data['time'] * 10000)
                    continue
                }
                if (this.data['value'] == '>' && resjson.result['ethusd'] > ethPrice) {
                    this.isTriggered = true;
                } else if (this.data['value'] == '<' && resjson.result['ethusd'] < ethPrice)
                    this.isTriggered = true;
                else if (this.data['value'] == '=' && resjson.result['ethusd'] == ethPrice)
                    this.isTriggered = true;
                if (this.isTriggered) {
                    this.last_price = resjson.result['ethusd']
                    this.result.push(resjson.result['ethusd'])
                }
            } catch (e) {}
            await sleep(this.data['time'] * 10000)
        }
    }

    public async isTrigger(): Promise<any[]> {
        return this.result;
    }

    public resetTrigger(): void {
        this.result = [];
        this.isTriggered = false;
        return;
    }
}