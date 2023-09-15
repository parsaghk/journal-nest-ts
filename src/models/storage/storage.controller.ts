import { JwtPayload } from '@auth/types';
import { CurrentUser, Serialize } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { EntityId } from '@shared/types';
import { Response } from 'express';
import { StorageResponseDto } from './dto';
import { StorageService } from './storage.service';

@ApiTags('Storage')
@Controller('/storage')
export class StorageController {
  public constructor(private readonly _storageService: StorageService) {}

  @Get('/:fileId')
  public async getFileById(
    @Param('fileId') fileId: EntityId,
    @Res() res: Response,
  ) {
    const { buffer, fileName, mimeType } =
      await this._storageService.getsFileById(fileId);
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-disposition': 'attachment;filename=' + fileName,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Post('upload')
  @Serialize(StorageResponseDto)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: JwtPayload,
  ) {
    return this._storageService.uploadFile(file, user.sub);
  }
}
