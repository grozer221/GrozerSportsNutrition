import { File } from '../files/file.entity';

export const ResponseFileConvert = (origin: string, file: File): File => {
    file.filePath = origin + file.destination.substr(1) + '/' + file.fileName;
    if (file.mimetype.match(/image/)?.length)
        file.fileImage = origin + file.destination.substr(1) + '/' + file.fileName;
    else
        file.fileImage = origin + '/static/images/file.png'
    return file;
};
