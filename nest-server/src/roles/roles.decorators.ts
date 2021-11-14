import { SetMetadata } from '@nestjs/common';
import { RoleName } from './role.entity';

export const Roles = (...roles: RoleName[]) => SetMetadata('roles', roles);
