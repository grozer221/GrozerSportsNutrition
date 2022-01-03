import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { Roles } from '../roles/roles.decorators';
import { RoleName } from '../roles/role.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCategoryInput } from './dto/create-category.input';
import { GetCategoriesResponse } from './dto/get-categories.response';
import { GetCategoriesInput } from './dto/get-categories.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { getSlug } from '../utils/get-slug';
import { Product } from '../products/product.entity';

@Resolver(() => Category)
export class CategoriesResolver {
    constructor(
        private readonly categoriesService: CategoriesService,
    ) {
    }

    @ResolveField(() => [Product])
    async products(@Parent() category: Category): Promise<Product[]> {
        return await this.categoriesService.getProductsByCategoryId(category.id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Category)
    async createCategory(
        @Args('createCategoryInput', { type: () => CreateCategoryInput }) createCategoryInput: CreateCategoryInput,
    ): Promise<Category> {
        return await this.categoriesService.addAsync(createCategoryInput);
    }

    @Query(() => GetCategoriesResponse)
    async getCategories(
        @Args('getCategoriesInput', { type: () => GetCategoriesInput }) getCategoriesInput: GetCategoriesInput,
    ): Promise<GetCategoriesResponse> {
        return await this.categoriesService.getAsync(getCategoriesInput.take, getCategoriesInput.skip);
    }

    @Query(() => Category)
    async getCategory(@Args('slug', { type: () => String }) slug: string): Promise<Category> {
        return await this.categoriesService.getBySlugAsync(slug);
    }

    @Query(() => Category)
    async getCategoryByName(@Args('name', { type: () => String }) name: string): Promise<Category> {
        return await this.categoriesService.getByNameAsync(name);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Category)
    async updateCategory(@Args('updateCategoryInput', { type: () => UpdateCategoryInput }) updateCategoryInput: UpdateCategoryInput): Promise<Category> {
        return await this.categoriesService.updateAsync(updateCategoryInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async removeCategory(@Args('slug', { type: () => String }) slug: string): Promise<boolean> {
        await this.categoriesService.removeAsync(slug);
        return true;
    }
}
