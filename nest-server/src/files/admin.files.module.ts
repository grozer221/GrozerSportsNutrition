import { Module } from '@nestjs/common';
import { AdminFilesService } from './admin.files.service';
import { AdminFilesResolver } from './admin.files.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { AdminFilesController } from './admin.files.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
    ],
    providers: [
        AdminFilesResolver,
        AdminFilesService,
    ],
    controllers: [
        AdminFilesController,
    ],
})
export class AdminFilesModule {
}
