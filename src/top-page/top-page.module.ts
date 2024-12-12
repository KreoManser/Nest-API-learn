import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/top-page.model';

@Module({
  controllers: [TopPageController],
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([
      {
        name: TopPageModel.name,
        schema: TopPageSchema,
        collection: 'TopPage',
      },
    ]),
  ],
})
export class TopPageModule {}
