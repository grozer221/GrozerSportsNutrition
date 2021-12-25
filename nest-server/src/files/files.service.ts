import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { File } from './file.entity';
import { GetFilesResponse } from './dto/get-files.response';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseFileConvert } from '../utills/response.file.convert';

@Injectable({ scope: Scope.REQUEST })
export class FilesService {
    origin;

    constructor(
        @InjectRepository(File) private filesRepository: Repository<File>,
        @Inject(REQUEST) private readonly request: Request,
    ) {
        // @ts-ignore
        const rawHeaders: string[] = this.request.req.rawHeaders;
        // @ts-ignore
        this.origin = this.request.req.protocol + '://' + rawHeaders[rawHeaders.indexOf('Host') + 1];
    }

    async getTotalAsync(): Promise<number> {
        return await this.filesRepository.count();
    }

    async addAsync(createFileInput: CreateFileInput): Promise<File> {
        const file = this.filesRepository.create(createFileInput);
        return await this.filesRepository.save(file);
    }

    async getAsync(take: number, skip: number, likeOriginalName: string, likeMimetype: string): Promise<GetFilesResponse> {
        const getFilesResponse = new GetFilesResponse();
        const files = await this.filesRepository.find({
            where: {
                originalName: Like(`%${likeOriginalName}%`),
                mimetype: Like(`%${likeMimetype}%`),
            },
            take: take,
            skip: skip,
        });
        const filesCount = await this.filesRepository.find({
            where: {
                originalName: Like(`%${likeOriginalName}%`),
                mimetype: Like(`%${likeMimetype}%`),
            },
        });
        getFilesResponse.files = files.map(file => ResponseFileConvert(this.origin, file));
        getFilesResponse.total = filesCount.length;
        // @ts-ignore
        console.log(this.request.req);
        return getFilesResponse;
    }

    async getByIdAsync(id: number): Promise<File> {
        const file = await this.filesRepository.findOneOrFail(id);
        return ResponseFileConvert(this.origin, file);
    }

    async getByNameAsync(fileName: string): Promise<File> {
        const file = await this.filesRepository.findOneOrFail({ where: { fileName: fileName } });
        return ResponseFileConvert(this.origin, file);
    }

    async updateAsync(updateFileInput: UpdateFileInput): Promise<File> {
        const file = await this.filesRepository.save(updateFileInput);
        return ResponseFileConvert(this.origin, file);
    }

    async removeAsync(id: number): Promise<File> {
        const file = await this.getByIdAsync(id);
        const removedFile = await this.filesRepository.remove(file);
        return ResponseFileConvert(this.origin, removedFile);
    }
}
