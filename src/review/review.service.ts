import { Injectable } from '@nestjs/common';
import { ReviewDocument, ReviewModel } from './models/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    const transformedDto = {
      ...dto,
      productId: new Types.ObjectId(dto.productId),
    };
    return this.reviewModel.create(transformedDto);
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async deleteByProductId(productId: string) {
    // eslint-disable-next-line prettier/prettier
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    // eslint-disable-next-line prettier/prettier
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
