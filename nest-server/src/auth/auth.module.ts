import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { config } from 'dotenv';
import { MailModule } from '../mail/mail.module';

config();

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
        }),
        MailModule,
    ],
    providers: [
        AuthService,
        AuthResolver,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        AuthService,
    ],
})

export class AuthModule {
}
