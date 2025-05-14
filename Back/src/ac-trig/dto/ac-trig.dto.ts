import {IsNotEmpty, IsString, IsEmail, Length} from 'class-validator'
import exp from 'constants';

export class NewActionDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public servicename: string;

    @IsNotEmpty()
    @IsString()
    public func: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    public toSend: any
}

export class NewTriggerDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public servicename: string;

    @IsNotEmpty()
    @IsString()
    public func: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    public toSend: any
}

export class NewServiceDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public logo: string;

    @IsNotEmpty()
    @IsString()
    public color: string;

    @IsString()
    public oauth2url: string;
}