import {instance} from './api';
import {FileName, FileType} from '../types/types';

export const filesAPI = {
    upload(files: File[], filesNames: FileName[]) {
        let formData = new FormData;
        files.forEach((file, i) => {
            formData.append(`files[]`, file, filesNames[i].newName);
        });
        return instance.post<ResponseType>('files/upload', formData, {
            headers: {'Content-Type': 'multipart-form-data'},
        }).then(res => res.data);
    },
};

type ResponseType = {
    result: boolean,
    files: FileType[],
}
