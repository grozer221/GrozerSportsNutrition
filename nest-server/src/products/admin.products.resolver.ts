import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AdminProductsService } from './admin.products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Roles } from '../roles/roles.decorators';
import { RoleName } from '../roles/role.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetProductsInput } from './dto/get-products.input';
import { GetProductsResponse } from './dto/get-products.response';
import { File } from '../files/file.entity';
import { Category } from '../categories/category.entity';

@Resolver(() => Product)
export class AdminProductsResolver {
    constructor(
        private readonly adminProductsService: AdminProductsService,
    ) {
    }

    @ResolveField(() => [File])
    async files(@Parent() product: Product): Promise<File[]> {
        return await this.adminProductsService.getFilesByProductId(product.id);
    }

    @ResolveField(() => [Category])
    async categories(@Parent() product: Product): Promise<Category[]> {
        return await this.adminProductsService.getCategoriesByProductId(product.id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => GetProductsResponse)
    async getProducts(
        @Args('getProductsInput', { type: () => GetProductsInput }) getProductsInput: GetProductsInput,
    ): Promise<GetProductsResponse> {
        return await this.adminProductsService.getAsync(getProductsInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Product)
    async getProduct(@Args('slug', { type: () => String }) slug: string): Promise<Product> {
        return await this.adminProductsService.getBySlugAsync(slug);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Product)
    async getProductByName(@Args('name', { type: () => String }) name: string): Promise<Product> {
        return await this.adminProductsService.getByNameAsync(name);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Product)
    async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
        return await this.adminProductsService.createAsync(createProductInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Product)
    async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<Product> {
        return await this.adminProductsService.updateAsync(updateProductInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async removeProduct(@Args('slug', { type: () => String }) slug: string): Promise<boolean> {
        await this.adminProductsService.removeAsync(slug);
        return true;
    }
}
