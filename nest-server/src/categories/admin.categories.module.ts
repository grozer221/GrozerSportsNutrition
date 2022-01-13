import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './admin.categories.service';
import { AdminCategoriesResolver } from './admin.categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [
    AdminCategoriesResolver,
    AdminCategoriesService,
  ],
})
export class AdminCategoriesModule {
}
