
export default class Logger {
    public marker:string;
    constructor(marker:string) {
        this.marker = marker;
    }

    public createTimestamp(){
        const time = Date.now();
        return new Date(time).toISOString();
    }

    public i(message:string) {
        console.log(`[${this.marker}] ${this.createTimestamp()} ${message}`)
    }

    public e(arg:string | Error){
        console.log(`[${this.marker}] ${this.createTimestamp()} ERROR:: ${typeof arg === 'string' ? arg: arg.message}`);
    }
}
