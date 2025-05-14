export interface Trigger {
    result
    isTrigger(): Promise<any[]>;
    resetTrigger(): void;
}

export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}