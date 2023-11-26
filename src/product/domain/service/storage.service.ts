import { MultipartFile } from '@fastify/multipart';

export interface IStorageService {
  uploadFile(data: MultipartFile, storageKey: string): Promise<void>;
}

export const IStorageService = Symbol('IStorageService');
