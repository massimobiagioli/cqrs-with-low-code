import { Module } from '@nestjs/common';
import { ProductController } from './presentation/http/product.controller';
import { ImportCsvHandler } from './application/command-handler/import-csv-handler';
import { CqrsModule } from '@nestjs/cqrs';

export const CommandHandlers = [ImportCsvHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [...CommandHandlers],
})
export class ProductModule {}
