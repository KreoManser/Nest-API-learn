import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponseDto } from './dto/file-element.response.dto';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponseDto[]> {
    const saveArray: MFile[] = [new MFile(file)];
    if (file.mimetype.includes('image')) {
      const buffer = await this.filesService.convertToWebp(file.buffer);
      saveArray.push(
        new MFile({ originalname: `${file.originalname.split('.')[0]}.webp`, buffer }),
      );
    }
    return await this.filesService.saveFiles(saveArray);
  }
}
