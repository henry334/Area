export interface Action {
    startAction(data: any, userId : string, triggerResult : any) : Promise<void>;
}
