import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import type { Response } from 'express';
import { FilesService } from './files.service';

import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // 📤 UPLOAD FILE
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
            'Only JPEG, PNG and WEBP images are allowed',
        );
    }

    const fileMeta = {
      generatedName: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `http://localhost:3000/files/${file.filename}`,
    };

    return this.filesService.addFile(fileMeta);
  }

  // 📥 GET ALL FILES
  @Get()
  getAllFiles() {
    return this.filesService.getAll();
  }

  // 📥 GET FILE BY NAME
  @Get(':name')
  getFile(@Param('name') name: string, @Res() res: Response) {
    const file = this.filesService.findByName(name);

    if (!file) {
      throw new BadRequestException('File not found');
    }

    const filePath = join(process.cwd(), 'uploads', file.generatedName);

    return res.sendFile(filePath);
  }
}