import {FileType} from '../../types/types';
import {gql} from '@apollo/client';

export type CreateFilesData = { filesCreate: FileType[] }
export type CreateFilesVars = { createFileInput: createFileInput }

export type createFileInput = {
    originalName: string;
    mimetype: string;
    destination: string;
    fileName: string;
    size: number;
}
export const CREATE_FILES_MUTATION = gql`
    mutation CreateFile($createFileInput: CreateFileInput!) {
        createFile(createFileInput: $createFileInput) {
            id
        }
    }
`;

export type RemoveFilesData = {}
export type RemoveFilesVars = { id: number }

export const REMOVE_FILES_MUTATION = gql`
    mutation RemoveFile($id: Int!){
        removeFile(id: $id)
    }
`;
