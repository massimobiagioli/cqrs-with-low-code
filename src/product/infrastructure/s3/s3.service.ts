import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { MultipartFile } from '@fastify/multipart';
import { Injectable } from '@nestjs/common';

const BUCKET_NAME = 'products-upload';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client();
  }

  async uploadFile(data: MultipartFile) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: data.fieldname,
        Body: await data.toBuffer(),
      }),
    );
  }
}
