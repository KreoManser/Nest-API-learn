import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async () => {
    try {
      // eslint-disable-next-line prettier/prettier
      const response = await request(app.getHttpServer())
        .post('/review/create')
        .send(testDto);

      console.log('Response body:', response.body);
      console.log('Response status:', response.status);

      expect(response.status).toBe(201);
      createdId = response.body._id;
      expect(createdId).toBeDefined();
    } catch (e) {
      console.error('Ошибка в тесте:', e);
      throw e;
    }
  });

  afterAll(() => {
    disconnect();
  });
});
