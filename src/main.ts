import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AssetService } from './asset/asset.service';
const fs = require('node:fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const data = fs.readFileSync('movielist.csv', 'utf8');
    const defaultMoviesList = new AssetService();
    defaultMoviesList.create(data);
  } catch (err) {
    console.error(err);
  }

  await app.listen(3000);
}
bootstrap();
