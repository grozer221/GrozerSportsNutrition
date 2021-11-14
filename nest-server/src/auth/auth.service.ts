import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }


    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && await compare(password, user.password))
            return user;
        return null;
    }

    async register(registerInput: RegisterInput): Promise<User> {
        return this.usersService.add(registerInput);
    }

    async isEmailFree(email: string): Promise<boolean> {
        const user = await this.usersService.findOneByEmail(email);
        return !user;
    }

    async login(id: number, email): Promise<string> {
        const payload = { email, sub: id };
        return this.jwtService.sign(payload);
    }
}
