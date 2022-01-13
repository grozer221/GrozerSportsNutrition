import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Product} from './product.entity';
import {GetProductsInput} from './dto/get-products.input';
import {GetProductsResponse} from './dto/get-products.response';
import {File} from '../files/file.entity';
import {Category} from '../categories/category.entity';
import {CustomerProductsService} from './customer.products.service';

@Resolver(() => Product)
export class CustomerProductsResolver {
    constructor(
        private readonly customerProductsService: CustomerProductsService,
    ) {
    }

    @ResolveField(() => [File])
    async files(@Parent() product: Product): Promise<File[]> {
        return await this.customerProductsService.getFilesByProductId(product.id);
    }

    @ResolveField(() => [Category])
    async categories(@Parent() product: Product): Promise<Category[]> {
        return await this.customerProductsService.getCategoriesByProductId(product.id);
    }

    @Query(() => GetProductsResponse)
    async getProducts(
        @Args('getProductsInput', {type: () => GetProductsInput}) getProductsInput: GetProductsInput,
    ): Promise<GetProductsResponse> {
        return await this.customerProductsService.getAsync(getProductsInput.take, getProductsInput.skip, getProductsInput.likeName);
    }

    @Query(() => Product)
    async getProduct(@Args('slug', {type: () => String}) slug: string): Promise<Product> {
        return await this.customerProductsService.getBySlugAsync(slug);
    }

    @Query(() => Product)
    async getProductByName(@Args('name', {type: () => String}) name: string): Promise<Product> {
        return await this.customerProductsService.getByNameAsync(name);
    }

    @Query(() => [Product])
    async getProductsHitOfSales(): Promise<Product[]> {
        return await this.customerProductsService.getProductsHitOfSales();
    }
}
