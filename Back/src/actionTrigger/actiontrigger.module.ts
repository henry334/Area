import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'prisma/prisma.module';
import { TriggerActionController } from './actiontrigger.controller';
import { TriggerActionService } from './actiontrigger.service';
import { TriggerLogic } from './triggerLogic';
import PinNewEvent  from './google/newcalendarevent.trigger'

@Module({
    imports: [PrismaModule],
    controllers: [TriggerActionController],
    providers: [TriggerActionService, PrismaService]
})

export class TriggerActionModule {
    private triggerlogic = null
    constructor(private prisma: PrismaService, private triggeractionserv: TriggerActionService) {
        this.triggerlogic = new TriggerLogic(prisma, triggeractionserv)
        this.triggerlogic.triggerlog()
    }
}