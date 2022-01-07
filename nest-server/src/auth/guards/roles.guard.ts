import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Role} from '../../roles/role.entity';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        // @ts-ignore
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]) as string[];

        if (!requiredRoles)
            return true;

        const gqlReq = GqlExecutionContext.create(context).getContext().req;
        let userRoles: string[];
        if (gqlReq) {
            userRoles = gqlReq.user.roles.map(role => role.name);
        } else {
            const {user} = context.switchToHttp().getRequest();
            userRoles = user?.roles.map(role => role.name);
        }
        return requiredRoles.some((role) => userRoles.includes(role));
    }
}
