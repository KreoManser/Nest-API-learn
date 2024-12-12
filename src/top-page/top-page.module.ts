import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TopPageController],
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TopPage',
        schema: undefined,
        collection: 'TopPage',
      },
    ]),
  ],
})
export class TopPageModule {}
