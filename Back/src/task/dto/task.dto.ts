import {IsNotEmpty, IsString, IsEmail, Length} from 'class-validator'

export class TaskDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public triggerid: string;

    @IsNotEmpty()
    @IsString()
    public actionid: string;

    @IsNotEmpty()
    public triggerdata: any;

    @IsNotEmpty()
    public actiondata: any;
}