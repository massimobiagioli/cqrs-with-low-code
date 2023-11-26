import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CommandBus } from '@nestjs/cqrs';
import { ImportCsvCommand } from '../../application/command/import-csv-command';

@Controller('product')
export class ProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/importCsv')
  @HttpCode(200)
  async uploadFile(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<never>,
  ): Promise<void> {
    if (!req.isMultipart()) {
      res.send(new BadRequestException());
      return;
    }

    const csvData = await req.file();

    let now = new Date();
    now = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
    const storageKey = `${now.toISOString()}-${csvData.filename}`;

    await this.commandBus.execute(new ImportCsvCommand(csvData, storageKey));

    res.send();
  }
}
