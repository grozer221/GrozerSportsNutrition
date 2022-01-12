import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin.users.service';
import { AdminUsersResolver } from './admin.users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RolesModule,
    ],
    providers: [
        AdminUsersService,
        AdminUsersResolver,
    ],
    exports: [
        AdminUsersService,
    ],
})

export class AdminUsersModule {
}
