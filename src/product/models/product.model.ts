import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class ProductCharacteristics {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema({ _id: true })
export class ProductModel {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop([String])
  categories: string[];

  @Prop([String])
  tags: string[];

  @Prop({ type: [ProductCharacteristics], _id: false })
  characteristics: ProductCharacteristics[];
}

export const ProductShema = SchemaFactory.createForClass(ProductModel);
