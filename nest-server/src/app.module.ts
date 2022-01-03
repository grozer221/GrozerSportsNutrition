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
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { PagesModule } from './pages/pages.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'static/schema.gql'),
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
            },
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
            rootPath: join(__dirname, '..', 'static'),
            exclude: ['/api*'],
            serveRoot: '/static',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
            exclude: ['/api*'],
        }),
        UsersModule,
        AuthModule,
        RolesModule,
        ProductsModule,
        FilesModule,
        CategoriesModule,
        PagesModule,
        OrdersModule,
    ],
    providers: [
        AppService,
    ],
})

export class AppModule {
}
