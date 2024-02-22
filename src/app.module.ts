import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AssetModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
