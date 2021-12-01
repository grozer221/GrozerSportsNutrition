import {instance} from './api';
import {FileType} from '../types/types';

export const filesAPI = {
    upload(files: File[]) {
        let formData = new FormData;
        files.forEach((file, i) => {
            formData.append(`files[]`, file);
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
