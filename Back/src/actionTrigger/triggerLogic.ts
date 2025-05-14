import { PrismaService } from 'prisma/prisma.service'
import * as Cron from 'cron'
import { Trigger } from './trigger'
import { Inject, Injectable } from '@nestjs/common'
import { TriggerActionService } from './actiontrigger.service';

export class TriggerLogic {
    private allTask = null
    constructor(@Inject(PrismaService) private prisma: PrismaService, @(Inject)(TriggerActionService) private triggeractionserv: TriggerActionService) {}

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async getTask(triggerList: { [key: string]: Trigger }) {
        this.allTask = await this.prisma.tasks.findMany()
        for (const task of this.allTask) {

            const exists: boolean = task['id'] in triggerList;
            if (exists) {
                continue
            }
            const trigger = await this.prisma.triggersAvailable.findUnique({ where: { id: task['triggerId'] } });
            if (trigger) {
                if (trigger['availability'] == false)
                    continue
                const TaskTrigger = require(trigger.func).default;
                if (TaskTrigger) {
                    triggerList[task['id']] = new TaskTrigger(task['triggerData'], task['userId'], this.prisma, this.triggeractionserv);
                }
            }
        }
        return triggerList;
    }

    async triggerlog() {
        var triggerList: { [key: string]: Trigger } = {}
        triggerList = await this.getTask(triggerList);
        const job = new Cron.CronJob('* * * * * *', async () => {
            for (const key in triggerList) {
                const Trigger = triggerList[key];
                const result = await Trigger.isTrigger()
                if (result.length > 0) {
                    Trigger.resetTrigger();
                    const task = this.allTask.find(t => t['id'] === key)
                    if (task) {
                        const Action = await this.prisma.actionsAvailable.findUnique({ where: { id: task['actionId'] } });
                        if (Action) {
                            if (Action['availability'] == false)
                                continue
                            const TaskAction = require(Action['func']).default;
                            const doaction = new TaskAction(this.prisma);
                            if (task['actionData']['body'] != null && task['actionData']['body'].includes("{result}")) {
                                task['actionData']['body'] = task['actionData']['body'].replace("{result}", result[0])
                            }
                            doaction.startAction(task['actionData'], task['userId'], result);
                        } else {
                            console.log('Action not found.');
                        }
                    }
                }
            }
            triggerList = await this.getTask(triggerList);
        })
        job.start()
    }
}