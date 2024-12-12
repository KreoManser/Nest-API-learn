import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './models/auth.model';

@Module({
  controllers: [AuthController],
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthSchema,
        collection: 'Auth',
      },
    ]),
  ],
})
export class AuthModule {}
