import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { FilesModule } from '../files/files.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        FilesModule,
    ],
    providers: [
        ProductsResolver,
        ProductsService,
    ],
})
export class ProductsModule {
}
