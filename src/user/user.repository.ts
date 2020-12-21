import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SignUpDto, SignInDto } from "src/auth/auth.validator";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { name, email, password, dob, gender, mobile } = signUpDto;

        const user = new UserEntity();
        user.name = name;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.dob = dob;
        user.gender = gender;
        user.mobile = mobile;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Email already in use');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(signInDto: SignInDto): Promise<any> {
        const { email, password } = signInDto;
        const user = await this.findOne({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        } else if (user.password === await this.hashPassword(password, user.salt)) {
            return user.id;
        } else if (user.password !== await this.hashPassword(password, user.salt)) {
            return false;
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}