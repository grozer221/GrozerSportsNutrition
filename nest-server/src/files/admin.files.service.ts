import {Inject, Injectable, Scope} from '@nestjs/common';
import {CreateFileInput} from './dto/create-file.input';
import {UpdateFileInput} from './dto/update-file.input';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {File} from './file.entity';
import {GetFilesResponse} from './dto/get-files.response';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express';
import {GetFilesInput} from './dto/get-files.input';

@Injectable({scope: Scope.REQUEST})
export class AdminFilesService {
    origin: string;

    constructor(
        @InjectRepository(File) private filesRepository: Repository<File>,
        @Inject(REQUEST) private readonly request: Request,
    ) {
        // @ts-ignore
        const rawHeaders: string[] = this.request.req.rawHeaders;
        // @ts-ignore
        this.origin = this.request.req.protocol + '://' + rawHeaders[rawHeaders.indexOf('Host') + 1];
    }

    getFilePath(file: File): string {
        return this.origin + file.destination.substr(1) + '/' + file.fileName;
    }

    getFileImage(file: File): string {
        if (file.mimetype.match(/image/)?.length)
            return this.origin + file.destination.substr(1) + '/' + file.fileName;
        else
            return this.origin + '/static/images/file.png';
    }

    async addAsync(createFileInput: CreateFileInput): Promise<File> {
        const file = this.filesRepository.create(createFileInput);
        return await this.filesRepository.save(file);
    }

    async getAsync(getFilesInput: GetFilesInput): Promise<GetFilesResponse> {
        const getFilesResponse = new GetFilesResponse();
        const [files, filesCount] = await this.filesRepository.findAndCount({
            where: {
                fileName: Like(`%${getFilesInput.likeFileName}%`),
                mimetype: Like(`%${getFilesInput.likeMimetype}%`),
            },
            take: getFilesInput.take,
            skip: getFilesInput.skip,
            order: {createdAt: 'DESC'},
        });
        getFilesResponse.files = files;
        getFilesResponse.total = filesCount;
        return getFilesResponse;
    }

    async getByIdAsync(id: number): Promise<File> {
        return await this.filesRepository.findOneOrFail(id);
    }

    async getByIdsAsync(ids: number[]): Promise<File[]> {
        const files: File[] = [];
        for (let i = 0; i < ids.length; i++) {
            const file = await this.filesRepository.findOneOrFail(ids[i]);
            files.push(file);
        }
        return files;
    }

    async getByNameAsync(fileName: string): Promise<File> {
        return await this.filesRepository.findOneOrFail({where: {fileName: fileName}});
    }

    async updateAsync(updateFileInput: UpdateFileInput): Promise<File> {
        return await this.filesRepository.save(updateFileInput);
    }

    async removeAsync(id: number): Promise<File> {
        const file = await this.getByIdAsync(id);
        return await this.filesRepository.remove(file);
    }
}
