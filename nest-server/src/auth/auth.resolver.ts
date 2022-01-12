import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginInput} from './dto/login.input';
import {AdminUsersService} from '../users/admin.users.service';
import {User} from '../users/user.entity';
import {GqlAuthGuard} from './guards/gql-auth.guard';
import {CurrentUser} from './auth.decorators';
import {RegisterInput} from './dto/register.input';
import {AuthResponse} from './dto/auth.response';
import {UpdateMeInput} from './dto/update-me.input';
import {UpdateEmailInput} from './dto/update-email.input';
import {UpdatePasswordInput} from './dto/update-password.input';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private usersService: AdminUsersService,
    ) {
    }

    @Mutation(() => AuthResponse)
    async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
        const user = await this.authService.validateUserAsync(loginInput.email, loginInput.password);
        if (!user)
            throw new Error('Bad credentials');

        if (!user.confirmedEmail) {
            await this.authService.sendConfirmationEmailTokenAsync(user);
            throw new Error('Please confirm your email');
        }

        const accessToken = await this.authService.getAuthJwtTokenAsync(user.id, user.email, user.roles);
        const authResponse = new AuthResponse();
        authResponse.user = user;
        authResponse.accessToken = accessToken;
        return authResponse;
    }

    @Mutation(() => String)
    async register(
        @Args('registerInput') registerInput: RegisterInput,
    ): Promise<string> {
        if (!await this.authService.isEmailFreeAsync(registerInput.email))
            throw new Error('Email already taken');
        const user = await this.authService.registerAsync(registerInput);

        await this.authService.sendConfirmationEmailTokenAsync(user);
        return 'Please confirm you email';
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => AuthResponse)
    async me(@CurrentUser() user: User): Promise<AuthResponse> {
        const currentUser = await this.usersService.getByIdAsync(user.id);

        if (!currentUser.confirmedEmail) {
            await this.authService.sendConfirmationEmailTokenAsync(currentUser);
            throw new Error('Please confirm your email');
        }

        const authResponse = new AuthResponse();
        authResponse.user = await this.usersService.getByIdAsync(user.id);
        authResponse.accessToken = await this.authService.getAuthJwtTokenAsync(user.id, user.email, user.roles);
        return authResponse;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => AuthResponse)
    async updateMe(
        @Args('updateMeInput', {type: () => UpdateMeInput}) updateMeInput: UpdateMeInput,
        @CurrentUser() currentUser: User,
    ): Promise<AuthResponse> {
        await this.authService.updateMeAsync(currentUser.id, updateMeInput);
        const authResponse = new AuthResponse();
        authResponse.user = await this.usersService.getByIdAsync(currentUser.id);
        authResponse.accessToken = await this.authService.getAuthJwtTokenAsync(currentUser.id, currentUser.email, currentUser.roles);
        return authResponse;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async updateEmail(
        @Args('updateEmailInput', {type: () => UpdateEmailInput}) updateEmailInput: UpdateEmailInput,
        @CurrentUser() currentUser: User,
    ): Promise<string> {
        if (!await this.authService.isEmailFreeAsync(updateEmailInput.email))
            throw new Error('Email already taken');
        const user = await this.authService.updateEmailAsync(currentUser.id, updateEmailInput);
        await this.authService.sendConfirmationEmailTokenAsync(user);
        return 'You successfully updated email. Please confirm you email';
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => AuthResponse)
    async updatePassword(
        @Args('updatePasswordInput', {type: () => UpdatePasswordInput}) updatePasswordInput: UpdatePasswordInput,
        @CurrentUser() currentUser: User,
    ): Promise<AuthResponse> {
        await this.authService.updatePasswordAsync(currentUser.id, updatePasswordInput.oldPassword, updatePasswordInput.newPassword);
        const authResponse = new AuthResponse();
        authResponse.user = await this.usersService.getByIdAsync(currentUser.id);
        authResponse.accessToken = await this.authService.getAuthJwtTokenAsync(currentUser.id, currentUser.email, currentUser.roles);
        return authResponse;
    }

    @Mutation(() => AuthResponse)
    async confirmationEmail(
        @Args('token', {type: () => String}) token: string,
    ): Promise<AuthResponse> {
        let user: User = await this.authService.validateConfirmEmailJwtTokenAsync(token);
        if (!user)
            throw new Error('Token is not valid');

        user = await this.usersService.confirmEmailAsync(user.email);
        const authResponse = new AuthResponse();
        authResponse.user = user;
        authResponse.accessToken = await this.authService.getAuthJwtTokenAsync(user.id, user.email, user.roles);
        return authResponse;
    }
}
