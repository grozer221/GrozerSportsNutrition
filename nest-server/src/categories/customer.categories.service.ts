import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {Category} from './category.entity';
import {GetCategoriesResponse} from './dto/get-categories.response';
import {productsConstants} from '../products/products.constants';
import {Product} from '../products/product.entity';
import {GetCategoriesInput} from './dto/get-categories.input';

@Injectable()
export class CustomerCategoriesService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {
    }

    async getProductsByCategoryId(id: number): Promise<Product[]> {
        const category = await this.categoryRepository.findOneOrFail(id, {
            relations: [productsConstants.tableName],
        });
        return category.products;
    }

    async getAsync(getCategoriesInput: GetCategoriesInput): Promise<GetCategoriesResponse> {
        const getCategoriesResponse = new GetCategoriesResponse();
        const [categories, categoriesCount] = await this.categoryRepository.findAndCount({
            take: getCategoriesInput.take,
            skip: getCategoriesInput.skip,
            where: {
                name: Like(`%${getCategoriesInput.likeName}%`),
                isShown: true,
            },
            order: {name: 'ASC'},
        });
        getCategoriesResponse.categories = categories;
        getCategoriesResponse.total = categoriesCount;
        return getCategoriesResponse;
    }

    async getBySlugAsync(slug: string): Promise<Category> {
        return await this.categoryRepository.findOneOrFail({
            where: {
                slug: slug,
                isShown: true,
            },
        });
    }
}
