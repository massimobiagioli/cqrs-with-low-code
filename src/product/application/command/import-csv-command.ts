import { MultipartFile } from '@fastify/multipart';

export class ImportCsvCommand {
  constructor(public readonly data: MultipartFile) {}
}
