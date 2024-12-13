import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductShema } from './models/product.model';
import { ProductService } from './product.service';

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
  providers: [ProductService],
})
export class ProductModule {}
