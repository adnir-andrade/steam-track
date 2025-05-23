import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./http-exception/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            // @ts-ignore
            enableImplicitConversion: true,
        }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(3000);
}
bootstrap();