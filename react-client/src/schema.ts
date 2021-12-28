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
        products: [Product!]!
    }

    type Characteristic {
        name: String!
        value: String!
    }

    type Product {
        id: Int!
        isShown: Boolean!
        name: String!
        quantity: Float!
        priceUAH: Float!
        description: String!
        characteristics: [Characteristic!]
        files: [File!]!
        categories: [Category!]!
    }

    type User {
        id: Int!
        email: String!
        firstName: String!
        lastName: String!
        roles: [Role!]!
    }

    type AuthResponse {
        user: User!
        accessToken: String!
    }

    type GetFilesResponse {
        files: [File!]!
        total: Int!
    }

    type GetProductsResponse {
        products: [Product!]!
        total: Int!
    }

    type GetCategoriesResponse {
        categories: [Category!]!
        total: Int!
    }

    type Query {
        getUsers(getUsersInput: GetUsersInput!): [User!]!
        getUser(id: Int!): User!
        getRoles(getRolesInput: GetRolesInput!): [Role!]!
        getRole(id: Int!): Role!
        me: AuthResponse!
        getProducts(getProductsInput: GetProductsInput!): GetProductsResponse!
        getProduct(id: Int!): Product!
        getProductByName(name: String!): Product!
        getFiles(getFilesInput: GetFilesInput!): GetFilesResponse!
        getFile(id: Int!): File!
        getFileByName(fileName: String!): File!
        getCategories(getCategoriesInput: GetCategoriesInput!): GetCategoriesResponse!
        getCategory(id: Int!): Category!
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
        createProduct(createProductInput: CreateProductInput!): Product!
        updateProduct(updateProductInput: UpdateProductInput!): Product!
        removeProduct(id: Int!): Boolean!
        createFile(createFileInput: CreateFileInput!): File!
        updateFile(updateFileInput: UpdateFileInput!): File!
        removeFile(id: Int!): Boolean!
        createCategory(createCategoryInput: CreateCategoryInput!): Category!
        updateCategory(updateCategoryInput: UpdateCategoryInput!): Category!
        removeCategory(id: Int!): Boolean!
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
        name: String!
        value: String!
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
