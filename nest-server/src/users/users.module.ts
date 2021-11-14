import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RolesModule,
    ],
    providers: [
        UsersService,
        UsersResolver,
    ],
    exports: [
        UsersService,
    ],
})

export class UsersModule {
}
