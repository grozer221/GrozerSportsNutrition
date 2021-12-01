import { Injectable } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File) private filesRepository: Repository<File>,
    ) {
    }

    async addAsync(createFileInput: CreateFileInput): Promise<File> {
        const file = this.filesRepository.create(createFileInput);
        return await this.filesRepository.save(file);
    }

    async getAsync(take: number, skip: number): Promise<File[]> {
        return await this.filesRepository.find({ take, skip });
    }

    async getByIdAsync(id: number): Promise<File> {
        return await this.filesRepository.findOneOrFail(id);
    }

    async updateAsync(updateFileInput: UpdateFileInput): Promise<File> {
        return await this.filesRepository.save(updateFileInput);
    }

    async removeAsync(id: number): Promise<File> {
        const file = await this.getByIdAsync(id);
        return await this.filesRepository.remove(file);
    }
}
