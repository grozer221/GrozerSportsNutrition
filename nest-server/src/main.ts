import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { printSchema } from 'graphql';

config();

(async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    const port = parseInt(process.env.PORT);
    await app.listen(port);
    console.log(`Server started on port ${port}`);
    //
    // const { schema } = app.get(GraphQLSchemaHost);
    // writeFileSync(join(process.cwd(), `static/schema.gql`), printSchema(schema));
})();
