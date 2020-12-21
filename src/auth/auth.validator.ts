import { IsEmail, IsEnum, IsISO8601, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Gender } from "src/user/user.enumerator";

export class SignUpDto {
    @IsString()
    @MinLength(3)
    @MaxLength(26)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak'
    })
    password: string;

    @IsISO8601()
    dob: Date;

    @IsEnum(Gender)
    gender: string;

    @IsNumber()
    mobile: number;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak'
    })
    password: string;
}