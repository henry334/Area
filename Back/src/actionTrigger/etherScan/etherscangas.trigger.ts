import { Trigger, sleep } from '../trigger'

export default class EtherScanGas implements Trigger {
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
        const gasPrice = parseInt(this.data['gasPrice'])
        while (true) {
            try {
                const res = await fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + this.api_key)
                if (res.status !== 200) {
                    continue
                }
                const resjson = await res.json()
                if (resjson.result['ProposeGasPrice'] == this.last_price) {
                    await sleep(2 * 10000)
                    continue
                }
                if (this.data['value'] == '>' && resjson.result['ProposeGasPrice'] > gasPrice)
                    this.isTriggered = true;
                else if (this.data['value'] == '<' && resjson.result['ProposeGasPrice'] < gasPrice)
                    this.isTriggered = true;
                else if (this.data['value'] == '=' && resjson.result['ProposeGasPrice'] == gasPrice)
                    this.isTriggered = true;
                if (this.isTriggered) {
                    this.result.push(resjson.result['ProposeGasPrice'])
                    this.last_price = resjson.result['ProposeGasPrice']
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