import { Injectable } from '@nestjs/common';

export interface FileMeta {
  generatedName: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
}

@Injectable()
export class FilesService {
  private files: FileMeta[] = [];

  addFile(file: FileMeta) {
    this.files.push(file);
    return file;
  }

  getAll() {
    return this.files;
  }

  findByName(name: string) {
    return this.files.find(f => f.generatedName === name);
  }
}