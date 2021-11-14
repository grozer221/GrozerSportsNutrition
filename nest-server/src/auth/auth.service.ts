import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { Role } from '../roles/role.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.getByEmailWithRolesAsync(email);
        if (user && await compare(password, user.password))
            return user;
        return null;
    }

    async register(registerInput: RegisterInput): Promise<User> {
        return this.usersService.addAsync(registerInput);
    }

    async isEmailFree(email: string): Promise<boolean> {
        const user = await this.usersService.getByEmailAsync(email);
        return !user;
    }

    async login(id: number, email: string, roles: Role[]): Promise<string> {
        const payload = { sub: id, email, roles };
        return this.jwtService.sign(payload);
    }
}
