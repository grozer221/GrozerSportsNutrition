import {AppStateType} from './redux-store';

export const s_getLoading = (state: AppStateType) => {
    return state.files.loading;
};

export const s_getUploadedFiles = (state: AppStateType) => {
    return state.files.uploadedFiles;
};
