import {gql} from '@apollo/client';
import {FileType} from '../../types/types';

export type GetFilesData = { getFiles: getFilesObject }
type getFilesObject = {files : FileType[], total: number}

export type GetFilesVars = { getFilesInput: getFilesInput }
type getFilesInput = { take: number, skip: number }


export const GET_FILES_QUERY = gql`
    query GetFiles($getFilesInput: GetFilesInput!) {
        getFiles(getFilesInput: $getFilesInput) {
            files {
                id
                mimetype
                destination
                fileName
                size
                originalName
            }
            total
        }
    }
`;


export type GetFileData = { getFile: FileType }

export type GetFileVars = { id: number }

export const GET_FILE_QUERY = gql`
    query GetFile($id: Int!){
        getFile(id: $id){
            id
            originalName
            mimetype
            destination
            fileName
            size
        }
    }
`;
