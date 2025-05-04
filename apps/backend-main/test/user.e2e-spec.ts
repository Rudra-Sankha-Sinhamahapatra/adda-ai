import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import type { Server } from 'http';
import { PrismaService } from '../src/prisma/prisma.service';

interface UserResponse {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthResponse {
  user: UserResponse;
  token: string;
}

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let httpServer: Server;
  let prisma: PrismaService;

  const testUser = {
    email: `test.${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Test bio',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
    await app.init();
    httpServer = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    // Clean up test user
    await prisma.client.user.delete({
      where: {
        email: testUser.email,
      },
    });
    await prisma.client.$disconnect();
    await app.close();
  });

  describe('POST /users/signup', () => {
    it('should create a new user', async () => {
      const response = await request(httpServer)
        .post('/users/signup')
        .send(testUser)
        .expect(201);

      const body = response.body as AuthResponse;
      expect(body).toHaveProperty('token');
      expect(body.user).toMatchObject({
        email: testUser.email,
        name: testUser.name,
        avatar: testUser.avatar,
        bio: testUser.bio,
      });
      expect(body.user).not.toHaveProperty('password');
    });

    it('should not allow duplicate email', async () => {
      await request(httpServer)
        .post('/users/signup')
        .send(testUser)
        .expect(409);
    });

    it('should validate required fields', async () => {
      await request(httpServer).post('/users/signup').send({}).expect(400);
    });
  });

  describe('POST /users/signin', () => {
    it('should authenticate valid credentials', async () => {
      const response = await request(httpServer)
        .post('/users/signin')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201);

      const body = response.body as AuthResponse;
      expect(body).toHaveProperty('token');
      expect(body.user).toMatchObject({
        email: testUser.email,
        name: testUser.name,
      });

      authToken = body.token;
    });

    it('should reject invalid password', async () => {
      await request(httpServer)
        .post('/users/signin')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('should reject non-existent user', async () => {
      await request(httpServer)
        .post('/users/signin')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password,
        })
        .expect(401);
    });
  });

  describe('GET /users/profile', () => {
    it('should get authenticated user profile', async () => {
      const response = await request(httpServer)
        .get('/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const body = response.body as UserResponse;
      expect(body).toMatchObject({
        email: testUser.email,
        name: testUser.name,
        avatar: testUser.avatar,
        bio: testUser.bio,
      });
      expect(body).not.toHaveProperty('password');
    });

    it('should reject unauthorized request', async () => {
      await request(httpServer).get('/users/profile').expect(401);
    });

    it('should reject invalid token', async () => {
      await request(httpServer)
        .get('/users/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
