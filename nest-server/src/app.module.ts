import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {AppService} from './app.service';
import {AdminUsersModule} from './users/admin.users.module';
import {join} from 'path';
import {TypeOrmCoreModule} from '@nestjs/typeorm/dist/typeorm-core.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {AuthModule} from './auth/auth.module';
import {AdminRolesModule} from './roles/admin.roles.module';
import {AdminProductsModule} from './products/admin.products.module';
import {AdminFilesModule} from './files/admin.files.module';
import {AdminCategoriesModule} from './categories/admin.categories.module';
import {CustomerPagesModule} from './pages/customer.pages.module';
import {AdminOrdersModule} from './orders/admin.orders.module';
import {MailModule} from './mail/mail.module';
import {AdminPagesModule} from './pages/admin.pages.module';
import {CustomerProductsModule} from './products/customer.products.module';
import {CustomerOrdersModule} from './orders/customer.orders.module';
import {CustomerCategoriesModule} from './categories/customer.categories.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'static/schema-admin.gql'),
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
            },
            path: '/graphql-admin',
            include: [
                AuthModule,
                MailModule,

                AdminPagesModule,
                AdminProductsModule,
                AdminOrdersModule,
                AdminUsersModule,

                AdminRolesModule,
                AdminFilesModule,
                AdminCategoriesModule,
            ],
            debug: true,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'static/schema-customer.gql'),
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
            },
            path: '/graphql-customer',
            include: [
                AuthModule,
                MailModule,

                CustomerPagesModule,
                CustomerProductsModule,
                CustomerOrdersModule,
                CustomerCategoriesModule,
            ],
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

        AuthModule,
        MailModule,

        CustomerPagesModule,
        CustomerProductsModule,
        CustomerOrdersModule,
        CustomerCategoriesModule,

        AdminPagesModule,
        AdminProductsModule,
        AdminOrdersModule,
        AdminCategoriesModule,

        AdminUsersModule,
        AdminRolesModule,
        AdminFilesModule,
    ],
    providers: [
        AppService,
    ],
})

export class AppModule {
}
