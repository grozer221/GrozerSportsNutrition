export const authorizationHeader = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
