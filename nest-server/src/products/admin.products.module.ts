import { Module } from '@nestjs/common';
import { AdminProductsService } from './admin.products.service';
import { AdminProductsResolver } from './admin.products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    providers: [
        AdminProductsResolver,
        AdminProductsService,
    ],
})
export class AdminProductsModule {
}
