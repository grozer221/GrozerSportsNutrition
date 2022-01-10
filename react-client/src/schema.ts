import {gql} from '@apollo/client';

export const schema = gql`
    type Role {
        id: Int!
        name: RoleName!
        color: String!
        users: [User!]!
    }

    enum RoleName {
        admin
        moderator
        customer
    }

    type File {
        id: Int!
        originalName: String!
        mimetype: String!
        destination: String!
        fileName: String!
        filePath: String!
        fileImage: String!
        size: Int!
        products: [Product!]!
    }

    type Category {
        id: Int!
        isShown: Boolean!
        name: String!
        slug: String!
        description: String!
        products: [Product!]
    }

    type Characteristic {
        name: String
        value: String
    }

    type Order {
        id: Int!
        email: String!
        firstName: String!
        lastName: String!
        phoneNumber: String!
        address: String!
        shippingMethod: ShippingMethod!
        orderStatus: OrderStatus!
        user: User!
        userId: Int!
        productsInOrder: [ProductInOrder!]!
    }

    enum ShippingMethod {
        warehouse
        courier
    }

    enum OrderStatus {
        new
        picking
        delivering
        waitingForTheCustomerAtThePickUpPoint
        completed
    }

    type ProductInOrder {
        id: Int!
        product: Product!
        productId: Int!
        productQuantity: Int!
        order: Order!
        orderId: Int!
    }

    type Product {
        id: Int!
        isShown: Boolean!
        name: String!
        slug: String!
        quantity: Float!
        priceUAH: Float!
        description: String!
        characteristics: [Characteristic!]
        files: [File!]!
        categories: [Category!]
    }

    type User {
        id: Int!
        confirmedEmail: Boolean!
        email: String!
        firstName: String!
        lastName: String!
        roles: [Role!]!
        orders: [Order!]!
    }

    type AuthResponse {
        user: User!
        accessToken: String!
    }

    type GetProductsResponse {
        products: [Product!]!
        total: Int!
    }

    type GetFilesResponse {
        files: [File!]!
        total: Int!
    }

    type GetCategoriesResponse {
        categories: [Category!]!
        total: Int!
    }

    type Page {
        id: Int!
        isShown: Boolean!
        name: String!
        slug: String!
        text: String!
        sorting: Int!
    }

    type GetOrdersResponse {
        orders: [Order!]!
        total: Int!
    }

    type Query {
        me: AuthResponse!
        getUsers(getUsersInput: GetUsersInput!): [User!]!
        getUser(id: Int!): User!
        getRoles(getRolesInput: GetRolesInput!): [Role!]!
        getRole(id: Int!): Role!
        getProducts(getProductsInput: GetProductsInput!): GetProductsResponse!
        getProduct(slug: String!): Product!
        getProductByName(name: String!): Product!
        getPages: [Page!]!
        getPage(slug: String!): Page!
        getOrders(getOrdersInput: GetOrdersInput!): GetOrdersResponse!
        getOrder(id: Int!): Order!
        getFiles(getFilesInput: GetFilesInput!): GetFilesResponse!
        getFile(id: Int!): File!
        getFileByName(fileName: String!): File!
        getCategories(getCategoriesInput: GetCategoriesInput!): GetCategoriesResponse!
        getCategory(slug: String!): Category!
        getCategoryByName(name: String!): Category!
    }

    input GetUsersInput {
        take: Int!
        skip: Int!
    }

    input GetRolesInput {
        take: Int!
        skip: Int!
    }

    input GetProductsInput {
        take: Int!
        skip: Int!
        likeName: String!
    }

    input GetOrdersInput {
        take: Int!
        skip: Int!
    }

    input GetFilesInput {
        take: Int!
        skip: Int!
        likeOriginalName: String!
        likeMimetype: String!
    }

    input GetCategoriesInput {
        take: Int!
        skip: Int!
    }

    type Mutation {
        login(loginInput: LoginInput!): AuthResponse!
        register(registerInput: RegisterInput!): AuthResponse!
        confirmEmail(token: String!): AuthResponse!
        createProduct(createProductInput: CreateProductInput!): Product!
        updateProduct(updateProductInput: UpdateProductInput!): Product!
        removeProduct(slug: String!): Boolean!
        createPage(createPageInput: CreatePageInput!): Page!
        updatePage(updatePageInput: UpdatePageInput!): Page!
        updatePages(updatePagesInput: UpdatePagesInput!): [Page!]!
        removePage(slug: String!): Boolean!
        createOrder(createOrderInput: CreateOrderInput!): Order!
        updateOrder(updateOrderInput: UpdateOrderInput!): Order!
        removeOrder(id: Int!): Boolean!
        createFile(createFileInput: CreateFileInput!): File!
        updateFile(updateFileInput: UpdateFileInput!): File!
        removeFile(id: Int!): Boolean!
        createCategory(createCategoryInput: CreateCategoryInput!): Category!
        updateCategory(updateCategoryInput: UpdateCategoryInput!): Category!
        removeCategory(slug: String!): Boolean!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    input CreateProductInput {
        isShown: Boolean!
        name: String!
        quantity: Float!
        priceUAH: Float!
        description: String!
        characteristics: [CharacteristicInputType!]
        files: [UpdateFileInput!]!
    }

    input CharacteristicInputType {
        name: String
        value: String
    }

    input UpdateFileInput {
        originalName: String
        mimetype: String
        destination: String
        fileName: String
        size: Int
        id: Int!
    }

    input UpdateProductInput {
        isShown: Boolean
        name: String
        quantity: Float
        priceUAH: Float
        description: String
        characteristics: [CharacteristicInputType!]
        files: [UpdateFileInput!]
        id: Int!
    }

    input CreatePageInput {
        isShown: Boolean!
        name: String!
        text: String!
    }

    input UpdatePageInput {
        isShown: Boolean
        name: String
        text: String
        id: Int!
        sorting: Int!
    }

    input UpdatePagesInput {
        updatePagesInput: [UpdatePageInput!]!
    }

    input CreateOrderInput {
        email: String!
        firstName: String!
        lastName: String!
        phoneNumber: String!
        address: String!
        shippingMethod: ShippingMethod!
        createProductInOrder: [CreateProductInOrderInput!]!
    }

    input CreateProductInOrderInput {
        productId: Float!
        productQuantity: Float!
    }

    input UpdateOrderInput {
        email: String
        firstName: String
        lastName: String
        phoneNumber: String
        address: String
        shippingMethod: ShippingMethod
        createProductInOrder: [CreateProductInOrderInput!]
        id: Int!
        orderStatus: OrderStatus!
    }

    input CreateFileInput {
        originalName: String!
        mimetype: String!
        destination: String!
        fileName: String!
        size: Int!
    }

    input CreateCategoryInput {
        isShown: Boolean!
        name: String!
        description: String!
        products: [UpdateProductWithoutFilesInput!]!
    }

    input UpdateProductWithoutFilesInput {
        isShown: Boolean
        name: String
        quantity: Float
        priceUAH: Float
        description: String
        characteristics: [CharacteristicInputType!]
        id: Int!
    }

    input UpdateCategoryInput {
        isShown: Boolean
        name: String
        description: String
        products: [UpdateProductWithoutFilesInput!]
        id: Int!
    }
`

