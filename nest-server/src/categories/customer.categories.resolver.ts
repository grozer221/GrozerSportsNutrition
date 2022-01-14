import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Category} from './category.entity';
import {GetCategoriesResponse} from './dto/get-categories.response';
import {GetCategoriesInput} from './dto/get-categories.input';
import {Product} from '../products/product.entity';
import {CustomerCategoriesService} from './customer.categories.service';

@Resolver(() => Category)
export class CustomerCategoriesResolver {
    constructor(
        private readonly customerCategoriesService: CustomerCategoriesService,
    ) {
    }

    @ResolveField(() => [Product])
    async products(@Parent() category: Category): Promise<Product[]> {
        return await this.customerCategoriesService.getProductsByCategoryId(category.id);
    }

    @Query(() => GetCategoriesResponse)
    async getCategories(
        @Args('getCategoriesInput', {type: () => GetCategoriesInput}) getCategoriesInput: GetCategoriesInput,
    ): Promise<GetCategoriesResponse> {
        return await this.customerCategoriesService.getAsync(getCategoriesInput);
    }

    @Query(() => Category)
    async getCategory(@Args('slug', {type: () => String}) slug: string): Promise<Category> {
        return await this.customerCategoriesService.getBySlugAsync(slug);
    }
}
