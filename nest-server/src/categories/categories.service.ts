import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { GetCategoriesResponse } from './dto/get-categories.response';
import { UpdateCategoryInput } from './dto/update-category.input';
import { getSlug } from '../utils/get-slug';
import { File } from '../files/file.entity';
import { filesConstants } from '../files/files.constants';
import { Product } from '../products/product.entity';
import { productsConstants } from '../products/products.constants';

@Injectable()
export class CategoriesService {
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

  async getAsync(take: number, skip: number): Promise<GetCategoriesResponse> {
    const getCategoriesResponse = new GetCategoriesResponse();
    const categories = await this.categoryRepository.find({
      take: take,
      skip: skip,
    });
    const categoriesCount = await this.categoryRepository.find();
    getCategoriesResponse.categories = categories;
    getCategoriesResponse.total = categoriesCount.length;
    return getCategoriesResponse;
  }

  async getByIdAsync(id: number): Promise<Category> {
    return await this.categoryRepository.findOneOrFail(id);
  }

  async getByNameAsync(name: string): Promise<Category> {
    return await this.categoryRepository.findOneOrFail({ where: { name: name } });
  }

  async updateAsync(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    return await this.categoryRepository.save(updateCategoryInput);
  }

  async removeAsync(id: number): Promise<Category> {
    const category = await this.getByIdAsync(id);
    return await this.categoryRepository.remove(category);
  }
}
