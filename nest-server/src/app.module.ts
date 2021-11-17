import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        TypeOrmCoreModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'grozer-sports-nutrition',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
            exclude: ['/api*'],
        }),
        UsersModule,
        AuthModule,
        RolesModule,
        ProductsModule,
    ],
    providers: [AppService],
})

export class AppModule {
}
