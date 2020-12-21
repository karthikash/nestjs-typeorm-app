import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './auth.validator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInDto);
    }
}
