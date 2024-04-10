/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.username, 
            sub:{
                name: user.name,
            }
        };
        return {
            ...user,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {expiresIn:'7d'})
        };
    }

    async refreshToken(user: User) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        };
    
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
