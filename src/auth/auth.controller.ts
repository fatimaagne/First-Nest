/* eslint-disable prettier/prettier */
import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post( 'register')
    async registerUser(@Body() body) {
        return await this.userService.create(body);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refrshToken(@Request() req) {
        return this.authService.refreshToken(req.user);
    }
}
