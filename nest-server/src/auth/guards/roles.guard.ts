import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../roles/role.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles)
            return true;

        const ctx = GqlExecutionContext.create(context);
        const userRoles = ctx.getContext().req.user.roles.map(role => role.name);
        return requiredRoles.some((role) => userRoles.includes(role));
    }
}
