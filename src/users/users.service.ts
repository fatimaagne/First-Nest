/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  // async create(createUserDto: Prisma.UserCreateInput) {
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  //   return this.databaseService.user.create({ data: { ...createUserDto, password: hashedPassword } });
  // }
  async create(createUserDto: Prisma.UserCreateInput) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new Error('Username already exists');
    }
  
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.databaseService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }
  

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOneByUsername(username: string) {
    return this.databaseService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({ where: { id }});
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({ where: { id }, data: updateUserDto }) ;
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id }}) ;
  }
}
