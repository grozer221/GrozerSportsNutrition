export enum RoleName {
    admin = 'admin',
    moderator = 'moderator',
    customer = 'customer',
}

export type Role = {
    id: number,
    name: RoleName,
}

export type User = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    roles: Role[],
}

export type Auth = {
    user: User,
    accessToken: string
}

export type Product = {
    id: number,
    name: string,
}

export type FileType = {
    id: number,
    filePath: string,
    fileImage: string,
    originalName: string,
    mimetype: string,
    destination: string,
    fileName: string,
    size: number,
}
