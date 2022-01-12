import {hash} from 'bcrypt';

export const hashPassword = async (password) => {
    return await hash(password, 10);
}
