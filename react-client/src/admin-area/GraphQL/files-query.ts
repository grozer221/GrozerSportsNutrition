import {gql} from '@apollo/client';
import {FileType} from '../../types/types';

export type GetFilesData = { getFiles: FileType[] }
export type GetFilesVars = { getFilesInput: getFilesInput }

type getFilesInput = { take: number, skip: number }


export const GET_FILES_QUERY = gql`
    query GetFiles($getFilesInput: GetFilesInput!){
        getFiles(getFilesInput: $getFilesInput){
            id
            mimetype
            destination
            fileName
            size
        }
    }
`;
