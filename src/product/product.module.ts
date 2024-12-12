import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductShema } from './models/product.model';

@Module({
  controllers: [ProductController],
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductModel.name,
        schema: ProductShema,
        collection: 'Product',
      },
    ]),
  ],
})
export class ProductModule {}
