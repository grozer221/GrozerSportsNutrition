import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
    ],
    providers: [
        RolesResolver,
        RolesService,
    ],
    exports: [
        RolesService,
    ],
})
export class RolesModule {
}
