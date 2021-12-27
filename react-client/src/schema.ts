import {gql} from '@apollo/client';

export const schema = gql`
    type Role {
        id: Int!
        name: RoleName!
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

    type Query {
        getUsers(getUsersInput: GetUsersInput!): [User!]!
        getUser(id: Int!): User!
        getRoles(getRolesInput: GetRolesInput!): [Role!]!
        getRole(id: Int!): Role!
        me: AuthResponse!
        getProducts(getProductsInput: GetProductsInput!): GetProductsResponse!
        getProduct(id: Int!): Product!
        getFiles(getFilesInput: GetFilesInput!): GetFilesResponse!
        getFile(id: Int!): File!
        getFileByName(fileName: String!): File!
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

    type Mutation {
        login(loginInput: LoginInput!): AuthResponse!
        register(registerInput: RegisterInput!): AuthResponse!
        createProduct(createProductInput: CreateProductInput!): Product!
        updateProduct(updateProductInput: UpdateProductInput!): Product!
        removeProduct(id: Int!): Boolean!
        createFile(createFileInput: CreateFileInput!): File!
        updateFile(updateFileInput: UpdateFileInput!): File!
        removeFile(id: Int!): Boolean!
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
        filesIds: [Float!]!
        quantity: Float!
        priceUAH: Float!
        description: String!
        characteristics: [CharacteristicInputType!]
    }

    input CharacteristicInputType {
        name: String!
        value: String!
    }

    input UpdateProductInput {
        id: Int!
        isShown: Boolean!
        name: String!
        filesIds: [Float!]!
        quantity: Float!
        priceUAH: Float!
        description: String!
        characteristics: [CharacteristicInputType!]
    }

    input CreateFileInput {
        originalName: String!
        mimetype: String!
        destination: String!
        fileName: String!
        size: Int!
    }

    input UpdateFileInput {
        id: Int!
        originalName: String!
        mimetype: String!
        destination: String!
        fileName: String!
        size: Int!
    }
`
