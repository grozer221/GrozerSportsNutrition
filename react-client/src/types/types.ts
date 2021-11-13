export enum Role {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
    EDITOR = 'editor'
}

export type User = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    role: Role,
}

export type Auth = User & { token: string }
