import { Injectable } from '@nestjs/common';
import { CreatePageInput } from './dto/create-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { Product } from '../products/product.entity';
import { productsConstants } from '../products/products.constants';
import { CreateCategoryInput } from '../categories/dto/create-category.input';
import { Category } from '../categories/category.entity';
import { getSlug } from '../utils/get-slug';
import { GetCategoriesResponse } from '../categories/dto/get-categories.response';
import { UpdateCategoryInput } from '../categories/dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';

@Injectable()
export class PagesService {
  constructor(
      @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {
  }

  async addAsync(createPageInput: CreatePageInput): Promise<Page> {
    const page = this.pageRepository.create(createPageInput);
    page.slug = getSlug(page.name);
    return await this.pageRepository.save(page);
  }

  async getAsync(): Promise<Page[]> {
    return await this.pageRepository.find();;
  }

  async getByIdAsync(id: number): Promise<Page> {
    return await this.pageRepository.findOneOrFail(id);
  }

  async updateAsync(updatePageInput: UpdatePageInput): Promise<Page> {
    return await this.pageRepository.save(updatePageInput);
  }

  async removeAsync(id: number): Promise<Page> {
    const page = await this.getByIdAsync(id);
    return await this.pageRepository.remove(page);
  }
}
