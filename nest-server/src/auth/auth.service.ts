import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { Role } from '../roles/role.entity';
import { config } from 'dotenv';
import { MailService } from '../mail/mail.service';

config();

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
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

    async getAuthJwtToken(id: number, email: string, roles: Role[]): Promise<string> {
        const returnRoles = roles.map(role => {
            const { createdAt, updatedAt, ...rest } = role;
            return rest;
        });
        const payload = { sub: id, email, roles: returnRoles };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.AUTH_JWT_EXPIRES_IN,
        });
    }

    async sendConfirmationEmailToken(user: User): Promise<void> {
        const confirmationEmailJwtToken = await this.getConfirmationEmailJwtToken(user.id, user.email);
        this.mailService.sendConfirmationEmail(user, confirmationEmailJwtToken)
            .then((success) => console.log(success))
            .catch((err) => console.log(err));
    }

    async getConfirmationEmailJwtToken(id: number, email: string): Promise<string> {
        const payload = { sub: id, email };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.CONFIRM_EMAIL_JWT_EXPIRES_IN,
        });
    }

    async validateConfirmEmailJwtToken(token: string): Promise<User> {
        return await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }


}
