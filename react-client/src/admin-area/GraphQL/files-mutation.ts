import {FileType} from '../../types/types';
import {gql} from '@apollo/client';

// CREATE FILE
export type CreateFileData = { filesCreate: FileType[] }

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


// UPDATE FILE
export type UpdateFileData = { updateFile: FileType }

export type UpdateFileVars = { updateFileInput: updateFileInput }
export type updateFileInput = createFileInput & { id: number }

export const UPDATE_FILE_MUTATION = gql`
    mutation UpdateFile($updateFileInput: UpdateFileInput!) {
        updateFile(updateFileInput: $updateFileInput) {
            id
            originalName
            mimetype
            destination
            fileName
            filePath
            fileImage
            size
        }
    }
`;


// DELETE FILE
export type RemoveFileData = {}
export type RemoveFileVars = { id: number }

export const REMOVE_FILE_MUTATION = gql`
    mutation RemoveFile($id: Int!){
        removeFile(id: $id)
    }
`;
