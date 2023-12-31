import { Module } from '@nestjs/common';
import { ProductController } from './presentation/http/product.controller';
import { ImportCsvHandler } from './application/command-handler/import-csv-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { S3Service } from './infrastructure/s3/s3.service';
import { IStorageService } from './domain/service/storage.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

export const CommandHandlers = [ImportCsvHandler];

@Module({
  imports: [CqrsModule, ConfigModule, HttpModule],
  controllers: [ProductController],
  providers: [
    ...CommandHandlers,
    {
      provide: IStorageService,
      useClass: S3Service,
    },
  ],
})
export class ProductModule {}
