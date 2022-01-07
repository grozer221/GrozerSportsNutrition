import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Page} from './page.entity';

@Injectable()
export class CustomerPagesService {
    constructor(
        @InjectRepository(Page) private pageRepository: Repository<Page>,
    ) {
    }

    async getAsync(): Promise<Page[]> {
        return await this.pageRepository.find({
            order: {sorting: 'ASC'},
            where: {isShown: true},
        });
    }

    async getBySlugAsync(slug: string): Promise<Page> {
        return await this.pageRepository.findOneOrFail({
            where: {
                slug: slug, isShown: true,
            },
        });
    }
}
