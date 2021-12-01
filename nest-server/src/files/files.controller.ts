import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/files')
export class FilesController {
    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('files[]', 20, {
            storage: diskStorage({
                destination: './static/files',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, randomName + '_' + file.originalname);
                },
            }),
        }),
    )
    uploadFile(@UploadedFiles() files) {
        console.log(files);
        const resultFiles = files.map(file => ({
            originalName: file.originalname,
            mimetype: file.mimetype,
            destination: file.destination,
            fileName: file.filename,
            size: file.size,
        }));
        return {
            result: true,
            files: resultFiles,
        };
    }
}
