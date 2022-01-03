import { User } from '../users/user.entity';
import { RoleName } from '../roles/role.entity';

export const isModeratorOrAdmin = (user: User) => {
    return user.roles.some(r => r.name === RoleName.moderator || r.name === RoleName.admin)
}
