import { Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { JwtPayload } from "./auth.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        config: ConfigService
    ) {
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET_KEY'),
        });

    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const { id } = payload;
        const user = await this.userRepository.findOne({ id });
        if (!user) throw new UnauthorizedException();
        return user;
    }
}