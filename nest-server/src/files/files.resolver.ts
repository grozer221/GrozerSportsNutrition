import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { File } from './file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { GetFilesInput } from './dto/get-files.input';
import { Roles } from '../roles/roles.decorators';
import { RoleName } from '../roles/role.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetFilesResponse } from './dto/get-files.response';

@Resolver(() => File)
export class FilesResolver {
    constructor(
        private readonly filesService: FilesService,
    ) {
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @ResolveField(() => String)
    filePath(@Parent() file: File): string {
        return this.filesService.getFilePath(file);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @ResolveField(() => String)
    fileImage(@Parent() file: File): string {
        return this.filesService.getFileImage(file);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => File)
    async createFile(
        @Args('createFileInput') createFileInput: CreateFileInput,
    ): Promise<File> {
        return await this.filesService.addAsync(createFileInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => GetFilesResponse)
    async getFiles(
        @Args('getFilesInput', { type: () => GetFilesInput }) getFilesInput: GetFilesInput,
    ): Promise<GetFilesResponse> {
        return await this.filesService.getAsync(getFilesInput.take, getFilesInput.skip, getFilesInput.likeOriginalName, getFilesInput.likeMimetype);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => File)
    async getFile(@Args('id', { type: () => Int }) id: number): Promise<File> {
        return await this.filesService.getByIdAsync(id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => File)
    async getFileByName(@Args('fileName', { type: () => String }) fileName: string): Promise<File> {
        return await this.filesService.getByNameAsync(fileName);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => File)
    async updateFile(@Args('updateFileInput') updateFileInput: UpdateFileInput): Promise<File> {
        return await this.filesService.updateAsync(updateFileInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async removeFile(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        await this.filesService.removeAsync(id);
        return true;
    }
}
