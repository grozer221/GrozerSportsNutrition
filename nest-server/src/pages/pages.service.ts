import { Injectable } from '@nestjs/common';
import { CreatePageInput } from './dto/create-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { getSlug } from '../utils/get-slug';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import { UpdatePagesInput } from './dto/update-pages.input';

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Page) private pageRepository: Repository<Page>,
    ) {
    }

    async getCount(): Promise<number> {
        const pages = await this.pageRepository.find();
        return pages.length;
    }

    async addAsync(createPageInput: CreatePageInput): Promise<Page> {
        const page = this.pageRepository.create(createPageInput);
        page.slug = getSlug(page.name);
        page.sorting = await this.getCount() + 1;
        return await this.pageRepository.save(page);
    }

    async getAsync(): Promise<Page[]> {
        return await this.pageRepository.find({
            order: {
                sorting: 'ASC',
            },
        });
    }

    async getBySlugAsync(slug: string): Promise<Page> {
        return await this.pageRepository.findOneOrFail({ where: { slug: slug } });
    }

    async updateAsync(updatePageInput: UpdatePageInput): Promise<Page> {
        const page = this.pageRepository.create(updatePageInput);
        page.slug = getSlug(page.name);
        return await this.pageRepository.save(page);
    }

    async updateAllAsync(updatePagesInput: UpdatePagesInput): Promise<Page[]> {
        const returnPages: Page[] = [];
        for (let i = 0; i < updatePagesInput.updatePagesInput.length; i++) {
            const returnPage = await this.updateAsync(updatePagesInput.updatePagesInput[i]);
            returnPages.push(returnPage);
        }
        return returnPages;
    }

    async removeAsync(slug: string): Promise<Page> {
        const page = await this.getBySlugAsync(slug);
        return await this.pageRepository.remove(page);
    }


}
