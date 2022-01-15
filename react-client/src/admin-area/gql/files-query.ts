import {gql} from '@apollo/client';
import {FileType} from '../../types/types';

export type GetFilesData = { getFiles: getFilesObject }
type getFilesObject = { files: FileType[], total: number }

export type GetFilesVars = { getFilesInput: getFilesInput }
type getFilesInput = {
    take: number,
    skip: number,
    likeFileName: string,
    likeMimetype: string,
}


export const GET_FILES_QUERY = gql`
    query GetFiles($getFilesInput: GetFilesInput!) {
        getFiles(getFilesInput: $getFilesInput) {
            files {
                id
                filePath
                fileImage
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
            filePath
            fileImage
            originalName
            mimetype
            destination
            fileName
            size
        }
    }
`;


export type GetFileByNameData = { getFileByName: FileType }
export type GetFileByNameVars = { fileName: string }

export const GET_FILE_BY_NAME_QUERY = gql`
    query GetFileByName($fileName: String!) {
        getFileByName(fileName: $fileName) {
            id
            filePath
            fileImage
            mimetype
            destination
            fileName
            size
            originalName
        }
    }
`;
