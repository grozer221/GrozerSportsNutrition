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
import { Product } from '../products/product.entity';
import { getSlug } from '../utils/get-slug';
import { File } from '../files/file.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
      private readonly categoriesService: CategoriesService,
  ) {
  }

  @ResolveField(() => String)
  async slug(@Parent() category: Category): Promise<string> {
    return getSlug(category.name);
  }

  @ResolveField(() => [Product])
  async products(@Parent() category: Category): Promise<Product[]> {
    return await this.categoriesService.getProductsByCategoryId(category.id);
  }

  @Roles(RoleName.admin)
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
  async getCategory(@Args('id', { type: () => Int }) id: number): Promise<Category> {
    return await this.categoriesService.getByIdAsync(id);
  }

  @Roles(RoleName.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => Category)
  async getCategoryByName(@Args('name', { type: () => String }) name: string): Promise<Category> {
    return await this.categoriesService.getByNameAsync(name);
  }

  @Roles(RoleName.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Category)
  async updateCategory(@Args('updateCategoryInput', { type: () => UpdateCategoryInput }) updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    return await this.categoriesService.updateAsync(updateCategoryInput);
  }

  @Roles(RoleName.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async removeCategory(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.categoriesService.removeAsync(id);
    return true;
  }
}
