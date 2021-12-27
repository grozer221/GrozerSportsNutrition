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
    accessToken: string,
}

export type ProductWithoutFiles = {
    id: number,
    name: string,
    isShown: boolean,
    quantity: number,
    priceUAH: number,
    description: string,
    characteristics: Characteristic[],
    user: User,
}

export type Product = ProductWithoutFiles & {
    files: FileType[],
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

export type Characteristic = {
    name: string,
    value: string,
}
