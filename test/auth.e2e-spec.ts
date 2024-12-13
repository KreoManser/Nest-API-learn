import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { WRONG_LOGIN_OR_PASSWORD_ERROR } from '../src/auth/auth.constants';

const authDto: AuthDto = {
  login: 'a@a.ru',
  password: '1',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send(authDto)
      .expect(200)
      .then(({ body }): request.Response => {
        expect(body.access_token).toBeDefined();
        return;
      });
  });

  it('/auth/login (POST) - failure password', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...authDto, password: '23' })
      .expect(401)
      .then(({ body }): request.Response => {
        expect(body.message).toBe(WRONG_LOGIN_OR_PASSWORD_ERROR);
        return;
      });
  });

  it('/auth/login (POST) - failure login', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...authDto, login: 'abc@mail.ru' })
      .expect(401)
      .then(({ body }): request.Response => {
        expect(body.message).toBe(WRONG_LOGIN_OR_PASSWORD_ERROR);
        return;
      });
  });

  afterAll(() => {
    disconnect();
  });
});
