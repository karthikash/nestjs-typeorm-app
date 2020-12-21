import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { SignUpDto, SignInDto } from './auth.validator';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    signUp(signUpDto: SignUpDto): Promise<void> {
        return this.userRepository.signUp(signUpDto);
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const id = await this.userRepository.validateUserPassword(signInDto);
        const payload = { id };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload: ${JSON.stringify(payload)}`);
        return { accessToken };
    }

}
