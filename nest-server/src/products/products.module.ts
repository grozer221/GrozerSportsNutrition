import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { FilesModule } from '../files/files.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        FilesModule,
        // CategoriesModule,
    ],
    providers: [
        ProductsResolver,
        ProductsService,
    ],
    exports: [
        ProductsService,
    ],
})
export class ProductsModule {
}
