import {Injectable} from '@nestjs/common';
import {CreateProductInput} from './dto/create-product.input';
import {UpdateProductInput} from './dto/update-product.input';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Not, Repository} from 'typeorm';
import {Product} from './product.entity';
import {filesConstants} from '../files/files.constants';
import {File} from '../files/file.entity';
import {Category} from '../categories/category.entity';
import {GetProductsResponse} from './dto/get-products.response';
import {categoriesConstants} from '../categories/categories.constants';
import {getSlug} from '../utils/get-slug';
import {GetProductsInput} from './dto/get-products.input';
import {OrderBy} from '../utils/order-by.enum';

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
        const checkSlug = getSlug(createProductInput.name);
        const checkProduct = await this.productsRepository.findOne({where: {slug: checkSlug}});
        if (checkProduct)
            throw new Error('Product with current slug already exists');
        const product = this.productsRepository.create(createProductInput);
        product.slug = getSlug(product.name);
        return await this.productsRepository.save(product);
    }

    async getAsync(getProductsInput: GetProductsInput): Promise<GetProductsResponse> {
        const getProductsResponse = new GetProductsResponse();
        let order = {};
        switch (getProductsInput.orderBy) {
            case OrderBy.rating:
                order = {createdAt: 'DESC'};
                break;
            case OrderBy.newest:
                order = {createdAt: 'DESC'};
                break;
            case OrderBy.priceIncrease:
                order = {priceUAH: 'ASC'};
                break;
            case OrderBy.priceDecrease:
                order = {priceUAH: 'DESC'};
                break;
        }
        const [products, productsTotal] = await this.productsRepository.findAndCount({
            where: {
                name: Like(`%${getProductsInput.likeName}%`),
            },
            take: getProductsInput.take,
            skip: getProductsInput.skip,
            order: order,
        });
        getProductsResponse.products = products;
        getProductsResponse.total = productsTotal;
        return getProductsResponse;
    }

    async getByIdAsync(id: number): Promise<Product> {
        return await this.productsRepository.findOne(id);
    }

    async getBySlugAsync(slug: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({where: {slug}});
    }

    async getByNameAsync(name: string): Promise<Product> {
        return await this.productsRepository.findOneOrFail({where: {name: name}});
    }

    async updateAsync(updateProductInput: UpdateProductInput): Promise<Product> {
        const checkSlug = getSlug(updateProductInput.name);
        const checkProduct = await this.productsRepository.findOne({where: {slug: checkSlug, id: Not(updateProductInput.id)}});
        if (checkProduct)
            throw new Error('Product with current slug already exists');
        const product = this.productsRepository.create(updateProductInput);
        product.slug = getSlug(product.name);
        return await this.productsRepository.save(product);
    }

    async removeAsync(slug: string): Promise<Product> {
        const product = await this.getBySlugAsync(slug);
        return await this.productsRepository.remove(product);
    }
}
