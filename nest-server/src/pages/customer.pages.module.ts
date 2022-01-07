import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Page} from './page.entity';
import {CustomerPagesResolver} from './customer.pages.resolver';
import {CustomerPagesService} from './customer.pages.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Page]),
	],
	providers: [
		CustomerPagesResolver,
		CustomerPagesService,
	],
})
export class CustomerPagesModule {
}
