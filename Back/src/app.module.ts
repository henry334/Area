import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt'
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrismaModule } from 'prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { AdminModule } from './admin/admin.module';
import { Oauth2Module } from './oauth2/oauth2.module';
import { CreatAcTrigModule} from './ac-trig/creat-ac-trig.module';
import {DiscordBot } from  './actionTrigger/discord/discordBot'
import {TriggerActionModule} from './actionTrigger/actiontrigger.module'

@Module({
  imports: [AuthModule, PrismaModule, TriggerActionModule, JwtModule, TaskModule, AdminModule, Oauth2Module, CreatAcTrigModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})

export class AppModule {
  constructor(private readonly prismaService: PrismaService) {
    DiscordBot.getInstance()
  }
}
