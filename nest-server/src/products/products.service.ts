import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { FilesService } from '../files/files.service';
import { filesConstants } from '../files/files.constants';
import { File } from '../files/file.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Category } from '../categories/category.entity';
import { GetProductsResponse } from './dto/get-products.response';
import { categoriesConstants } from '../categories/categories.constants';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
    origin;

    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        private readonly filesService: FilesService,
        @Inject(REQUEST) private readonly request: Request,
    ) {
        // @ts-ignore
        const rawHeaders: string[] = this.request.req.rawHeaders;
        // @ts-ignore
        this.origin = this.request.req.protocol + '://' + rawHeaders[rawHeaders.indexOf('Host') + 1];
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

    async getByIdAsync(id: number): Promise<Product> {
        return await this.productsRepository.findOneOrFail(id);
    }

    async getByNameAsync(name: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({ where: { name: name } });
    }

    async updateAsync(updateProductInput: UpdateProductInput): Promise<Product> {
        return await this.productsRepository.save(updateProductInput);
    }

    async removeAsync(id: number): Promise<Product> {
        const product = await this.getByIdAsync(id);
        return await this.productsRepository.remove(product);
    }
}
