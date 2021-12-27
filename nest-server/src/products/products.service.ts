import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { FilesService } from '../files/files.service';
import { filesConstants } from '../files/files.constants';
import { File } from '../files/file.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

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

    async getTotalAsync(): Promise<number> {
        return await this.productsRepository.count();
    }

    async createAsync(createProductInput: CreateProductInput): Promise<Product> {
        const { filesIds, ...rest } = createProductInput;
        const product = this.productsRepository.create(rest);
        product.files = await this.filesService.getByIdsAsync(filesIds);
        return await this.productsRepository.save(product);
    }

    async getAsync(take: number, skip: number): Promise<Product[]> {
        return await this.productsRepository.find({ take, skip });
    }

    async getByIdAsync(id: number): Promise<Product> {
        return await this.productsRepository.findOneOrFail(id);
    }

    async updateAsync(updateProductInput: UpdateProductInput): Promise<Product> {
        const { filesIds, ...rest } = updateProductInput;
        rest.files = await this.filesService.getByIdsAsync(filesIds);
        return await this.productsRepository.save(rest);
    }

    async removeAsync(id: number): Promise<Product> {
        const product = await this.getByIdAsync(id);
        return await this.productsRepository.remove(product);
    }
}
