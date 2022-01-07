import {Args, Query, Resolver} from '@nestjs/graphql';
import {CustomerPagesService} from './customer.pages.service';
import {Page} from './page.entity';

@Resolver(() => Page)
export class CustomerPagesResolver {
    constructor(
        private readonly customerPagesService: CustomerPagesService,
    ) {
    }

    @Query(() => Page)
    async getPage(@Args('slug', {type: () => String}) slug: string): Promise<Page> {
        return await this.customerPagesService.getBySlugAsync(slug);
    }

    @Query(() => [Page])
    async getPages(): Promise<Page[]> {
        return await this.customerPagesService.getAsync();
    }
}
