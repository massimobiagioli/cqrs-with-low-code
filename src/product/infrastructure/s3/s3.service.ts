import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { MultipartFile } from '@fastify/multipart';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageService } from '../../domain/service/storage.service';

@Injectable()
export class S3Service implements IStorageService {
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client();
  }

  async uploadFile(data: MultipartFile, storageKey: string): Promise<void> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('PRODUCTS_BUCKET_NAME'),
        Key: storageKey,
        Body: await data.toBuffer(),
      }),
    );
  }
}
