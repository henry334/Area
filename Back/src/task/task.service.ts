import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async newTask(task, req, res : Response) {
        const {triggerid, triggerdata, actionid, actiondata, name} = task
        const id = req.user.id

        const newTask = await this.prisma.tasks.create({
            data : {
                userId : id,
                triggerId : triggerid,
                name : name,
                triggerData : triggerdata,
                actionId :actionid,
                actionData : actiondata
            }
        })

        return res.send({'taskId' : newTask.id}).status(200)
    }

    async deleteTask(id, req) {

        const e = await this.prisma.tasks.findUnique({where : {id : id}})
        if (!e) {
            throw new BadRequestException("task dont existe")
        }
        if (e.userId != req.user.id) {
            throw new BadRequestException("task dont belong to you")
        }
        await this.prisma.tasks.delete({where : {id : id}})
        return {'taskId deleted' : id}
    }

    async getTasksUser(userid, req) : Promise<any> {
        const e = await this.prisma.tasks.findMany({where : {userId : userid}})
        if (!e) {
            throw new BadRequestException("tasks dont existe")
        }
        const modifiedTasks = await Promise.all(e.map(async (task) => {
            var triggerName = ''
            var actionName = ''
            const trigger = await this.prisma.triggersAvailable.findUnique({where : {id : task.triggerId}})
            if (trigger != null) 
                triggerName = trigger.name
            const action = await this.prisma.actionsAvailable.findUnique({where : {id : task.actionId}})
            if (action != null)
                actionName = action.name
            return {
                ...task,
                triggerName: triggerName,
                actionName: actionName
            };
        }))
        return modifiedTasks
    }
}
