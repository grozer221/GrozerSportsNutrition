import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './auth.decorators';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {
    }

    @Mutation(() => AuthResponse)
    async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
        const user = await this.authService.validateUser(loginInput.email, loginInput.password);
        if (!user)
            throw new Error('Bad credentials');
        const accessToken = await this.authService.login(user.id, user.email, user.roles);
        const authResponse = new AuthResponse();
        authResponse.user = user;
        authResponse.accessToken = accessToken;
        return authResponse;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => AuthResponse)
    async me(@CurrentUser() user: User): Promise<AuthResponse> {
        const authResponse = new AuthResponse();
        authResponse.user = await this.usersService.getByIdAsync(user.id);
        authResponse.accessToken = await this.authService.login(user.id, user.email, user.roles);
        return authResponse;
    }

    @Mutation(() => AuthResponse)
    async register(
        @Args('registerInput') registerInput: RegisterInput,
    ): Promise<AuthResponse> {
        if (!await this.authService.isEmailFree(registerInput.email))
            throw new Error('Email already taken');
        const user = await this.authService.register(registerInput);
        const authResponse = new AuthResponse();
        authResponse.user = user;
        authResponse.accessToken = await this.authService.login(user.id, user.email, user.roles);
        return authResponse;
    }
}
