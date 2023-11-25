import { ImportCsvCommand } from '../command/import-csv-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { S3Service } from '../../infrastructure/s3/s3.service';

@CommandHandler(ImportCsvCommand)
export class ImportCsvHandler implements ICommandHandler<ImportCsvCommand> {
  constructor(private readonly s3Service: S3Service) {}

  async execute({ data }: ImportCsvCommand) {
    await this.s3Service.uploadFile(data);
  }
}
