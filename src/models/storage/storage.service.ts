import { AppConfigService } from '@config/app';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@models/users';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import { EntityId } from '@shared/types';
import { Storage } from './entities';
import fs = require('fs');
import path = require('path');

@Injectable()
export class StorageService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _appConfigService: AppConfigService,
  ) {}

  public async getsFileById(storageId: EntityId) {
    const storage = await this._entityManager.findOneOrFail(Storage, {
      id: storageId,
    });
    const res = fs.readFileSync(
      path.join(
        this._appConfigService.rootPath,
        'private',
        'images',
        storage.filePath,
      ),
    );

    return {
      mimeType: storage.mimeType,
      fileName: storage.fileName,
      buffer: res,
    };
  }

  public async uploadFile(
    file: Express.Multer.File,
    userId: EntityId,
  ): Promise<Storage> {
    const user = await this._entityManager.findOne(User, { id: userId });
    if (!user) throw new BadRequestException();
    const fileExtension = this._getExtensionOfFile(file.originalname);
    const storage = new Storage(
      file.originalname,
      file.mimetype,
      fileExtension,
      user,
    );
    fs.writeFileSync(
      path.join(
        this._appConfigService.rootPath,
        'private',
        'images',
        storage.filePath,
      ),
      file.buffer,
    );
    await this._entityManager.persistAndFlush(storage);
    return storage;
  }

  private _getExtensionOfFile(fileName: string) {
    return fileName.substring(fileName.lastIndexOf('.') + 1);
  }
}
