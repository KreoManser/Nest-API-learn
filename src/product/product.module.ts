import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductShema } from './models/product.model';

@Module({
  controllers: [ProductController],
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductShema,
        collection: 'Product',
      },
    ]),
  ],
})
export class ProductModule {}
