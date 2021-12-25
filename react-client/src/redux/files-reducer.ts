import {BaseThunkType, InferActionsTypes} from './redux-store';
import {filesAPI} from '../api/files-api';
import {FileType} from '../types/types';

let initialState = {
    loading: false,
    uploadedFiles: [] as FileType[],
};

const filesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading,
            };
        case 'SET_UPLOADED_FILES':
            return {
                ...state,
                uploadedFiles: action.uploadedFiles,
            };
        default:
            return state;
    }
};

export const actions = {
    setLoading: (loading: boolean) => ({
        type: 'SET_LOADING',
        loading,
    } as const),
    setUploadedFiles: (uploadedFiles: FileType[]) => ({
        type: 'SET_UPLOADED_FILES',
        uploadedFiles,
    } as const),
};

export const upload = (files: File[]): ThunkType => async (dispatch) => {
    dispatch(actions.setLoading(true));
    let data = await filesAPI.upload(files);
    if (data.result === true) {
        dispatch(actions.setUploadedFiles(data.files));
    }
    dispatch(actions.setLoading(false));
};

export default filesReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
