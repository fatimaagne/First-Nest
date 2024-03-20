/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports:  [DatabaseService] // allows other modules to import and use this service
})
export class DatabaseModule {}
