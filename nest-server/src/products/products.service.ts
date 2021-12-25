import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
    ) {
    }

    async getTotalAsync(): Promise<number> {
        return await this.productsRepository.count();
    }

    async createAsync(createProductInput: CreateProductInput): Promise<Product> {
        const product = this.productsRepository.create(createProductInput);
        return await this.productsRepository.save(product);
    }

    async getAsync(take: number, skip: number): Promise<Product[]> {
        return await this.productsRepository.find({ take, skip });
    }

    async getByIdAsync(id: number): Promise<Product> {
        return await this.productsRepository.findOneOrFail(id);
    }

    async updateAsync(updateProductInput: UpdateProductInput): Promise<Product> {
        return await this.productsRepository.save(updateProductInput);
    }

    async removeAsync(id: number): Promise<Product> {
        const product = await this.getByIdAsync(id);
        return await this.productsRepository.remove(product);
    }
}
