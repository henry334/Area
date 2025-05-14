import { Module } from '@nestjs/common';
import { CreatAcTrigService } from './creat-ac-trig.service';
import { CreatAcTrigController } from './creat-ac-trig.controller';

@Module({
  controllers: [CreatAcTrigController],
  providers: [CreatAcTrigService],
})

export class CreatAcTrigModule {constructor() {}}
