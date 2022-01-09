import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {Product} from './product.entity';
import {filesConstants} from '../files/files.constants';
import {File} from '../files/file.entity';
import {Category} from '../categories/category.entity';
import {GetProductsResponse} from './dto/get-products.response';
import {categoriesConstants} from '../categories/categories.constants';

@Injectable()
export class CustomerProductsService {
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
        return product.categories.filter(category => category.isShown === true);
    }

    async getAsync(take: number, skip: number, likeName: string): Promise<GetProductsResponse> {
        const getProductsResponse = new GetProductsResponse();
        const products = await this.productsRepository.find({
            where: {
                name: Like(`%${likeName}%`),
                isShown: true,
            },
            take: take,
            skip: skip,
        });
        const productsCount = await this.productsRepository.find({
            where: {
                name: Like(`%${likeName}%`),
                isShown: true,
            },
        });
        getProductsResponse.products = products;
        getProductsResponse.total = productsCount.length;
        return getProductsResponse;
    }

    async getBySlugAsync(slug: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({
            where: {
                slug: slug,
                isShown: true,
            },
        });
    }

    async getByNameAsync(name: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({
            where: {
                name: name,
                isShown: true,
            },
        });
    }
}
