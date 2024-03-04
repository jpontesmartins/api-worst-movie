import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express/';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        this.assetService.create(file.buffer);
    }
}
