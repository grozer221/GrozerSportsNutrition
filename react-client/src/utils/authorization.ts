import {RoleName, User} from '../types/types';

export const isModeratorOrAdmin = (user: User): boolean => {
    return user.roles.some(role => role.name === RoleName.moderator || role.name === RoleName.admin);
};


export const isAdmin = (user: User): boolean => {
    return user.roles.some(role => role.name === RoleName.admin);
};
