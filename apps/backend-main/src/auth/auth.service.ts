import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(plaintext: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hashed);
  }
}
