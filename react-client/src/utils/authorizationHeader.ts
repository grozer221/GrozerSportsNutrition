export const getAuthorizationHeader = (): string => {
    return localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
};
