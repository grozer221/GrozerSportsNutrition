import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {Product} from './product.entity';
import {filesConstants} from '../files/files.constants';
import {File} from '../files/file.entity';
import {Category} from '../categories/category.entity';
import {GetProductsResponse} from './dto/get-products.response';
import {categoriesConstants} from '../categories/categories.constants';
import {UpdateProductInput} from './dto/update-product.input';
import {getSlug} from '../utils/get-slug';
import {ProductInOrder} from '../orders/product-in-order.entity';
import {Order, OrderStatus} from '../orders/order.entity';

@Injectable()
export class CustomerProductsService {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(ProductInOrder) private productInOrderRepository: Repository<ProductInOrder>,
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
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
        const [products, productsTotal] = await this.productsRepository.findAndCount({
            where: {
                name: Like(`%${likeName}%`),
                isShown: true,
            },
            take: take,
            skip: skip,
            order: {createdAt: 'DESC'},
        });
        getProductsResponse.products = products;
        getProductsResponse.total = productsTotal;
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

    async getByIdAsync(id: number): Promise<Product> {
        return await this.productsRepository.findOneOrFail(id, {
            where: {isShown: true},
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

    async updateAsync(updateProductInput: UpdateProductInput): Promise<Product> {
        const product = this.productsRepository.create(updateProductInput);
        product.slug = getSlug(product.name);
        return await this.productsRepository.save(product);
    }

    async getProductsHitOfSales(): Promise<Product[]> {
        let productsHitOfSales: { product: Product, quantity: number }[] = [];
        const productsInOrder = await this.productInOrderRepository.find();
        for (const key in productsInOrder) {
            const product = await this.productsRepository.findOneOrFail(productsInOrder[key].productId);
            if (!product.isShown)
                continue;

            const order = await this.ordersRepository.findOneOrFail(productsInOrder[key].orderId);
            if (order.orderStatus === OrderStatus.canceled)
                continue;

            if (productsHitOfSales.some(productHitOfSales => productHitOfSales.product.id === productsInOrder[key].productId)) {
                productsHitOfSales = productsHitOfSales.map(productHitOfSales => {
                    return productHitOfSales.product.id === productsInOrder[key].productId
                        ? {
                            ...productHitOfSales,
                            quantity: productHitOfSales.quantity + productsInOrder[key].productQuantity,
                        }
                        : productHitOfSales;
                });
            } else {
                productsHitOfSales.push({
                    product: product,
                    quantity: productsInOrder[key].productQuantity,
                });
            }
        }
        productsHitOfSales.sort((a, b) => b.quantity - a.quantity);
        return productsHitOfSales.map((productHitOfSales, i) => {
            if (i > 10)
                return;
            return productHitOfSales.product;
        });
    }

    async getProductsNewest(): Promise<Product[]> {
        return await this.productsRepository.find({
            where: {isShown: true},
            order: {createdAt: 'DESC'},
            take: 10,
            skip: 0,
        });
    }
}
