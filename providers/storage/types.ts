// Shared StorageProvider interface — identical to core/apps/web/lib/storage/types.ts.
export interface StorageProvider {
  upload(path: string, data: ArrayBuffer, contentType: string): Promise<void>
  download(path: string): Promise<Buffer>
  remove(paths: string[]): Promise<void>
  getSignedUrl(path: string, expiresInSeconds: number): Promise<string>
}
