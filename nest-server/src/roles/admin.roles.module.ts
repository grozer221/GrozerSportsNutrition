import { Module } from '@nestjs/common';
import { AdminRolesService } from './admin.roles.service';
import { AdminRolesResolver } from './admin.roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
    ],
    providers: [
        AdminRolesResolver,
        AdminRolesService,
    ],
    exports: [
        AdminRolesService,
    ],
})
export class AdminRolesModule {
}
