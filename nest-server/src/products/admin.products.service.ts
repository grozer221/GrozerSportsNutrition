import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { filesConstants } from '../files/files.constants';
import { File } from '../files/file.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Category } from '../categories/category.entity';
import { GetProductsResponse } from './dto/get-products.response';
import { categoriesConstants } from '../categories/categories.constants';
import { getSlug } from '../utils/get-slug';

@Injectable()
export class AdminProductsService {

    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
    ) {
    }

    async getFilesByProductId(id: number): Promise<File[]> {
        const product = await this.productsRepository.findOneOrFail(id, {
            relations: [filesConstants.tableName],
        });
        return product.files;
    }

    async getCategoriesByProductId(id: number): Promise<Category[]> {
        const product = await this.productsRepository.findOneOrFail(id, {
            relations: [categoriesConstants.tableName],
        });
        return product.categories;
    }

    async getTotalAsync(): Promise<number> {
        return await this.productsRepository.count();
    }

    async createAsync(createProductInput: CreateProductInput): Promise<Product> {
        const product = this.productsRepository.create(createProductInput);
        product.slug = getSlug(product.name);
        return await this.productsRepository.save(product);
    }

    async getAsync(take: number, skip: number, likeName: string): Promise<GetProductsResponse> {
        const getProductsResponse = new GetProductsResponse();
        const products = await this.productsRepository.find({
            where: {
                name: Like(`%${likeName}%`),
            },
            take: take,
            skip: skip,
        });
        const productsCount = await this.productsRepository.find({
            where: {
                name: Like(`%${likeName}%`),
            },
        });
        getProductsResponse.products = products;
        getProductsResponse.total = productsCount.length;
        return getProductsResponse;
    }

    async getBySlugAsync(slug: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({ where: { slug } });
    }

    async getByNameAsync(name: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({ where: { name: name } });
    }

    async updateAsync(updateProductInput: UpdateProductInput): Promise<Product> {
        const product = this.productsRepository.create(updateProductInput);
        product.slug = getSlug(product.name);
        return await this.productsRepository.save(product);
    }

    async removeAsync(slug: string): Promise<Product> {
        const product = await this.getBySlugAsync(slug);
        return await this.productsRepository.remove(product);
    }
}