export enum RoleName {
    admin = 'admin',
    moderator = 'moderator',
    customer = 'customer',
}

export type Role = {
    id: number,
    name: RoleName,
    color: string,
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

export type Product = {
    id: number,
    name: string,
    slug: string,
    isShown: boolean,
    quantity: number,
    priceUAH: number,
    description: string,
    characteristics: Characteristic[],
    user: User,
    files: FileType[],
    categories: Category[],
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

export type Category = {
    id: number,
    isShown: boolean,
    name: string,
    slug: string,
    description: string,
    products: Product[],
}

export type Page = {
    id: number,
    isShown: boolean,
    name: string,
    slug: string,
    text: string,
    sorting: number,
}

export type OrderByType = 'ASC' | 'DESC';

export type FileName = {
    originalName: string,
    newName: string,
}
