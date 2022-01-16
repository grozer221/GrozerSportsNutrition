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
    orders: Order[],
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
    productsInOrder: ProductInOrder[];
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

export type ProductInBasket = {
    product: Product,
    productQuantity: number,
}

export enum ShippingMethod {
    warehouse = 'warehouse',
    courier = 'courier',
}

export enum OrderStatus {
    new = 'new',
    picking = 'picking',
    delivering = 'delivering',
    waitingForTheCustomerAtThePickUpPoint = 'waitingForTheCustomerAtThePickUpPoint',
    completed = 'completed',
    canceled = 'canceled',
}

export type Order = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    deliveryCityCode: string,
    deliveryCityName: string,
    deliveryWarehouse: string,
    totalPrice: number,
    shippingMethod: ShippingMethod,
    orderStatus: OrderStatus;
    user: User;
    userId: number;
    productsInOrder: ProductInOrder[];
    createdAt: string,
    updatedAt: string,
}

export type ProductInOrder = {
    id: number;
    product: Product;
    productId: number;
    productQuantity: number;
    order: Order;
    orderId: number;
}

export const all = 'all'

// Nova Poshta types //
export type City = {
    Present: string,
    Warehouses: number,
    MainDescription: string,
    Area: string,
    Region: string,
    SettlementTypeCode: string,
    DeliveryCity: string,
}

export type Warehouse = {
    Description: string,
    ShortAddress: string,
    Number: string,
    CityDescription: string,
}


// Statistics //
export type OrderStatistics = {
    date: string;
    ordersCount: number;
}

export type ProfitStatistics = {
    date: string;
    totalPrice: number;
}
