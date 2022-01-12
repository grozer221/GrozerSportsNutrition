import {Injectable} from '@nestjs/common';
import {AdminUsersService} from '../users/admin.users.service';
import {User} from '../users/user.entity';
import {JwtService} from '@nestjs/jwt';
import {compare} from 'bcrypt';
import {RegisterInput} from './dto/register.input';
import {Role} from '../roles/role.entity';
import {config} from 'dotenv';
import {MailService} from '../mail/mail.service';
import {UpdateMeInput} from './dto/update-me.input';
import {UpdateEmailInput} from './dto/update-email.input';

config();

@Injectable()
export class AuthService {
    constructor(
        private adminUsersService: AdminUsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.adminUsersService.getByEmailWithRolesAsync(email);
        if (user && await compare(password, user.password))
            return user;
        return null;
    }

    async register(registerInput: RegisterInput): Promise<User> {
        return this.adminUsersService.addAsync(registerInput);
    }

    async updateMe(userId: number, updateMeInput: UpdateMeInput, ): Promise<User> {
        return await this.adminUsersService.updateByIdAsync(userId, updateMeInput);
    }

    async updateEmail(userId: number, updateEmailInput: UpdateEmailInput) {
        return await this.adminUsersService.updateEmailByIdAsync(userId, updateEmailInput);
    }

    async isEmailFree(email: string): Promise<boolean> {
        const user = await this.adminUsersService.getByEmailAsync(email);
        return !user;
    }

    async getAuthJwtToken(id: number, email: string, roles: Role[]): Promise<string> {
        const returnRoles = roles.map(role => {
            const {createdAt, updatedAt, ...rest} = role;
            return rest;
        });
        const payload = {sub: id, email, roles: returnRoles};
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
        const payload = {sub: id, email};
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
