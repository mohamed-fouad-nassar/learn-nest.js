import request from 'supertest';
import { App } from 'supertest/types';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// import setupApp from '../src/setup-app';
import { AppModule } from '../src/app.module';
import { ShowUserDto } from '../src/users/dto/show-user.dto';

describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // setupApp(app);

    await app.init();
  });

  /* ------------------------- Test Cases ------------------------- */
  // NOT using /api prefix in the test as it only applied for the app in development and production, Not testing because it's a in main.ts it's out of the scope

  it('Handle a signup request', () => {
    const email = 'test-e2e@example.com';

    return request(app.getHttpServer())
      .post('/users/signup')
      .send({ email, password: 'asdf' })
      .expect(201)
      .then((res: request.Response) => {
        const { id, email: resEmail } = res.body as ShowUserDto;
        expect(id).toBeDefined();
        expect(resEmail).toEqual(email);
      });
  });

  it('Handle a signin request', () => {
    const email = 'test-e2e@example.com';

    return request(app.getHttpServer())
      .post('/users/signin')
      .send({ email, password: 'asdf' })
      .expect(201)
      .then((res: request.Response) => {
        const { id, email: resEmail } = res.body as ShowUserDto;
        expect(id).toBeDefined();
        expect(resEmail).toEqual(email);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
