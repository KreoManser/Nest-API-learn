import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const authDto: AuthDto = {
  login: 'a@a.ru',
  password: '1',
};

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
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer()).post('/auth/login').send(authDto);
    token = body.access_token;
  });

  it('/review/create (POST) - success', async () => {
    return await request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }): request.Response => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        return;
      });
  });

  it('/review/create (POST) - fail', async () => {
    return await request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400);
  });

  it('/review/byProduct/:productId (GET) - success', async () => {
    return await request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .send(testDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        return;
      });
  });

  it('/review/byProduct/:productId (GET) - failure', async () => {
    return await request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .send(testDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
        return;
      });
  });

  it('/review/:id (DELETE) - success', async () => {
    return await request(app.getHttpServer())
      .delete('/review/' + createdId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/review/:id (DELETE) - failure', async () => {
    return await request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
