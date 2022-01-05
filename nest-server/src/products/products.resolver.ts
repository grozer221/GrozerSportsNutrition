import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
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
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
    ) {
    }

    @ResolveField(() => [File])
    async files(@Parent() product: Product): Promise<File[]> {
        return await this.productsService.getFilesByProductId(product.id);
    }

    @ResolveField(() => [Category])
    async categories(@Parent() product: Product): Promise<Category[]> {
        return await this.productsService.getCategoriesByProductId(product.id);
    }

    @Query(() => GetProductsResponse)
    async getProducts(
        @Args('getProductsInput', { type: () => GetProductsInput }) getProductsInput: GetProductsInput,
    ): Promise<GetProductsResponse> {
        return await this.productsService.getAsync(getProductsInput.take, getProductsInput.skip, getProductsInput.likeName);
    }

    @Query(() => Product)
    async getProduct(@Args('slug', { type: () => String }) slug: string): Promise<Product> {
        return await this.productsService.getBySlugAsync(slug);
    }

    @Query(() => Product)
    async getProductByName(@Args('name', { type: () => String }) name: string): Promise<Product> {
        return await this.productsService.getByNameAsync(name);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Product)
    async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
        return await this.productsService.createAsync(createProductInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Product)
    async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<Product> {
        return await this.productsService.updateAsync(updateProductInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async removeProduct(@Args('slug', { type: () => String }) slug: string): Promise<boolean> {
        await this.productsService.removeAsync(slug);
        return true;
    }
}
