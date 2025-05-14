import {IsNotEmpty, IsString, IsEmail, Length} from 'class-validator'

export class AuthDto {
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 20, {message: "Password must be between 4 and 20 characters"})
    public password: string;

    @IsNotEmpty()
    @IsString()
    public username: string;
}

export class LoginDto {
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 20, {message: "Password must be between 4 and 20 characters"})
    public password: string;
}