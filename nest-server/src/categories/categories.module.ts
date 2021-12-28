import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    ProductsModule,
  ],
  providers: [
    CategoriesResolver,
    CategoriesService,
  ],
  exports: [
    // CategoriesService,
  ],
})
export class CategoriesModule {
}
