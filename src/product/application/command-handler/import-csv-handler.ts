import { ImportCsvCommand } from '../command/import-csv-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IStorageService } from '../../domain/service/storage.service';
import { ForbiddenException, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, tap } from 'rxjs';

@CommandHandler(ImportCsvCommand)
export class ImportCsvHandler implements ICommandHandler<ImportCsvCommand> {
  constructor(
    @Inject(IStorageService) private readonly storageService: IStorageService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async execute({ data, storageKey }: ImportCsvCommand) {
    await this.storageService.uploadFile(data, storageKey);
    await this.callLowCodePipeline(storageKey);
  }

  private async callLowCodePipeline(storageKey: string) {
    const result = this.httpService
      .post(this.configService.get<string>('FLOW_IMPORT_PRODUCTS_WEBHOOK'), {
        bucketName: this.configService.get<string>('PRODUCTS_BUCKET_NAME'),
        bucketKey: storageKey,
      })
      .pipe(tap((res) => console.log(res)))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    await lastValueFrom(result);
  }
}
