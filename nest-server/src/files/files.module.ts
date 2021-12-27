import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FilesController } from './files.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
    ],
    providers: [
        FilesResolver,
        FilesService,
    ],
    controllers: [
        FilesController,
    ],
    exports: [
        FilesService,
    ],
})
export class FilesModule {
}
