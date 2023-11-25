import { ImportCsvCommand } from '../command/import-csv-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ImportCsvCommand)
export class ImportCsvHandler implements ICommandHandler<ImportCsvCommand> {
  async execute(command: ImportCsvCommand) {
    console.log(command);
  }
}
