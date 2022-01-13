import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {Category} from './category.entity';
import {CreateCategoryInput} from './dto/create-category.input';
import {GetCategoriesResponse} from './dto/get-categories.response';
import {UpdateCategoryInput} from './dto/update-category.input';
import {getSlug} from '../utils/get-slug';
import {productsConstants} from '../products/products.constants';
import {Product} from '../products/product.entity';
import {GetCategoriesInput} from './dto/get-categories.input';

@Injectable()
export class AdminCategoriesService {
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

    async addAsync(createCategoryInput: CreateCategoryInput): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryInput);
        category.slug = getSlug(category.name);
        return await this.categoryRepository.save(category);
    }

    async getAsync(getCategoriesInput: GetCategoriesInput): Promise<GetCategoriesResponse> {
        const getCategoriesResponse = new GetCategoriesResponse();
        const [categories, categoriesCount] = await this.categoryRepository.findAndCount({
            take: getCategoriesInput.take,
            skip: getCategoriesInput.skip,
            where: {name: Like(`%${getCategoriesInput.likeName}%`)},
        });
        getCategoriesResponse.categories = categories;
        getCategoriesResponse.total = categoriesCount;
        return getCategoriesResponse;
    }

    async getBySlugAsync(slug: string): Promise<Category> {
        return await this.categoryRepository.findOneOrFail({where: {slug: slug}});
    }

    async getByNameAsync(name: string): Promise<Category> {
        return await this.categoryRepository.findOneOrFail({where: {name: name}});
    }

    async updateAsync(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
        const category = this.categoryRepository.create(updateCategoryInput);
        category.slug = getSlug(category.name);
        return await this.categoryRepository.save(category);
    }

    async removeAsync(slug: string): Promise<Category> {
        const category = await this.getBySlugAsync(slug);
        return await this.categoryRepository.remove(category);
    }
}
