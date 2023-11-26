import { ImportCsvCommand } from '../command/import-csv-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IStorageService } from '../../domain/service/storage.service';
import { Inject } from '@nestjs/common';

@CommandHandler(ImportCsvCommand)
export class ImportCsvHandler implements ICommandHandler<ImportCsvCommand> {
  constructor(
    @Inject(IStorageService) private readonly storageService: IStorageService,
  ) {}

  async execute({ data, storageKey }: ImportCsvCommand) {
    await this.storageService.uploadFile(data, storageKey);
  }
}
