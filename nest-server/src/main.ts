import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();

(async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    const port = parseInt(process.env.PORT);
    await app.listen(port);
    console.log(`Server started on port ${port}`);
})();
