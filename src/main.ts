import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {

    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    } else {
        app.enableCors({ origin: config.get('CORS_ORIGIN') });
        logger.log(`Accepting requests from origin "${config.get('CORS_ORIGIN')}"`);
    }

    app.useStaticAssets(join(__dirname, '..', 'src/public'));
    app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
    app.setViewEngine('hbs');

    const port = config.get('PORT');
    await app.listen(port);
    logger.log(`Application is running in ${config.get('NODE_ENV')} on port ${port}`)

}

bootstrap();