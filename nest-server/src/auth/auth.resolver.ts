import { Args, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {
    }

    @Mutation(returns => AuthResponse)
    async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
        const user = await this.authService.validateUser(loginInput.email, loginInput.password);
        if (!user)
            throw new Error('Bad credentials');
        const accessToken = await this.authService.login(user.id, user.email);
        const authResponse = new AuthResponse();
        authResponse.user = user;
        authResponse.accessToken = accessToken;
        return authResponse;
    }

    @Query(returns => User)
    @UseGuards(GqlAuthGuard)
    async me(@CurrentUser() user: User): Promise<User> {
        return await this.usersService.findOne(user.id);
    }

    @Mutation(returns => AuthResponse)
    async register(
        @Args('registerInput') registerInput: RegisterInput,
    ): Promise<AuthResponse> {
        if (!await this.authService.isEmailFree(registerInput.email))
            throw new Error('Email already taken');
        const user = await this.authService.register(registerInput);
        const authResponse = new AuthResponse();
        authResponse.user = user
        authResponse.accessToken = await this.authService.login(user.id, user.email);
        return authResponse;
    }
}

@ObjectType()
export class AuthResponse {
    @Field(type => User)
    user: User;

    @Field()
    accessToken: string;
}
