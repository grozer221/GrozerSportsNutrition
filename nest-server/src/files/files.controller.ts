import {Controller, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {Roles} from '../roles/roles.decorators';
import {RoleName} from '../roles/role.entity';
import {RolesGuard} from '../auth/guards/roles.guard';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@Controller('api/files')
export class FilesController {

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('files[]', 20, {
            storage: diskStorage({
                destination: './static/files',
                filename: (req, file, cb) => {
                    console.log(file);
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, randomName + '_' + file.originalname);
                },
            }),
        }),
    )
    uploadFile(@UploadedFiles() files) {
        return {
            result: true,
            files: files.map(file => ({
                originalName: file.originalname,
                mimetype: file.mimetype,
                destination: file.destination,
                fileName: file.filename,
                size: file.size,
            })),
        };
    }
}
