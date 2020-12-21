import { IsEnum, IsISO8601, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Gender } from "./user.enumerator";

export class UserByIdDto {
    @IsUUID()
    id: string;
}

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(26)
    name: string;

    @IsISO8601()
    dob: Date;

    @IsEnum(Gender)
    gender: string;

    @IsNumber()
    mobile: number;
}