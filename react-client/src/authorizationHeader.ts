export const getAuthorizationHeader = () => {
    console.log('getAuthorizationHeader');
    return localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
};
