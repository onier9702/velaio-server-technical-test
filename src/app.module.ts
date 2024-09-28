import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigDB } from './db/config';
import { TaskModule } from './task/task.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    
    // TypeOrmConfig
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return ConfigDB.getTypeOrmOptions(configService);
      },
      // This imports allow the typeOrm connect with Mysql and use .env without errors
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    
    TaskModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
