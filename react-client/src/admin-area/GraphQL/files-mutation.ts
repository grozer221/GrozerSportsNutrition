import {FileType} from '../../types/types';
import {gql} from '@apollo/client';

export type CreateFileData = { createFile: FileType[] }
export type CreateFileVars = { createFileInput: createFileInput }

export type createFileInput = {
    originalName: string;
    mimetype: string;
    destination: string;
    fileName: string;
    size: number;
}
export const CREATE_FILE_MUTATION = gql`
    mutation CreateFile($createFileInput: CreateFileInput!) {
        createFile(createFileInput: $createFileInput) {
            id
        }
    }
`;

export type RemoveFileData = {}
export type RemoveFileVars = { id: number }

export const REMOVE_FILE_MUTATION = gql`
    mutation RemoveFile($id: Int!){
        removeFile(id: $id)
    }
`;
