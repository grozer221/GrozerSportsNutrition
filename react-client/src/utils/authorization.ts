import {RoleName, User} from '../types/types';

export const isModeratorOrAdmin = (user: User) => {
    return user.roles.some(role => role.name === RoleName.moderator || role.name === RoleName.admin);
};


export const isAdmin = (user: User) => {
    return user.roles.some(role => role.name === RoleName.admin);
};
