import {FileType} from '../../types/types';
import {gql} from '@apollo/client';

// CREATE FILE
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


// UPDATE FILE
export type UpdateFilesData = { updateFile: FileType }

export type UpdateFilesVars = { updateFileInput: updateFileInput }
export type updateFileInput = createFileInput & { id: number }

export const UPDATE_FILES_MUTATION = gql`
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
export type RemoveFilesData = {}
export type RemoveFilesVars = { id: number }

export const REMOVE_FILES_MUTATION = gql`
    mutation RemoveFile($id: Int!){
        removeFile(id: $id)
    }
`;
