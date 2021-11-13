import { AppStateType } from './redux-store';

export const s_getAuthData = (state: AppStateType) => {
    return state.auth.authData;
}

export const s_getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}
