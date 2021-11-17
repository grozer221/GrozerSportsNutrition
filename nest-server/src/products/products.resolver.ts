import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {
    }

    @Query(() => [Product])
    async getProducts(
        @Args('getProductsInput', { type: () => GetProductsInput }) getProductsInput: GetProductsInput,
    ): Promise<Product[]> {
        return await this.productsService.getAsync(getProductsInput.take, getProductsInput.skip);
    }

    @Query(() => Product)
    async getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
        return await this.productsService.getByIdAsync(id);
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
    async removeProduct(@Args('id', { type: () => Int }) id: number): Promise<Boolean> {
        await this.productsService.removeAsync(id);
        return true;
    }
}
