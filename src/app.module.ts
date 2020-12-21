import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConstants } from './config/typeorm.config';
import { DatabaseConfig } from './config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [DatabaseConstants],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: DatabaseConfig
        }),
        TerminusModule,
        UserModule,
        AuthModule,
        TaskModule
    ],
    controllers: [HealthController],
    providers: [],
})

export class AppModule { }