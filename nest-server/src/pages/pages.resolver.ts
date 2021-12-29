import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PagesService } from './pages.service';
import { Page } from './page.entity';
import { Category } from '../categories/category.entity';
import { Roles } from '../roles/roles.decorators';
import { RoleName } from '../roles/role.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreatePageInput } from './dto/create-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { getSlug } from '../utils/get-slug';

@Resolver(() => Page)
export class PagesResolver {
  constructor(
      private readonly pagesService: PagesService,
  ) {
  }

  @ResolveField(() => String)
  async slug(@Parent() page: Page): Promise<string> {
    return getSlug(page.name);
  }

  @Roles(RoleName.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Page)
  async createPage(
      @Args('createPageInput', { type: () => CreatePageInput }) createPageInput: CreatePageInput,
  ): Promise<Page> {
    return await this.pagesService.addAsync(createPageInput);
  }

  @Query(() => [Page])
  async getPages(): Promise<Page[]> {
    return await this.pagesService.getAsync();
  }

  @Query(() => Page)
  async getPage(@Args('id', { type: () => Int }) id: number): Promise<Page> {
    return await this.pagesService.getByIdAsync(id);
  }

  @Roles(RoleName.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Page)
  async updatePage(@Args('updatePageInput', { type: () => UpdatePageInput }) updatePageInput: UpdatePageInput): Promise<Page> {
    return await this.pagesService.updateAsync(updatePageInput);
  }

  @Roles(RoleName.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async removePage(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.pagesService.removeAsync(id);
    return true;
  }
}
