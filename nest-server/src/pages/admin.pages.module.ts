import {Module} from '@nestjs/common';
import {AdminPagesService} from './admin.pages.service';
import {AdminPagesResolver} from './admin.pages.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Page} from './page.entity';
import {CustomerPagesResolver} from './customer.pages.resolver';
import {CustomerPagesService} from './customer.pages.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Page]),
	],
	providers: [
		AdminPagesResolver,
		AdminPagesService,
	],
})
export class AdminPagesModule {
}
