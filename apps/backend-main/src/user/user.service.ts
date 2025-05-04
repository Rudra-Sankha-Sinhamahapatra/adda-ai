import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'bcryptjs';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { email, password, name, avatar, bio } = signUpDto;

    const existingUser = await this.prisma.client.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.client.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        avatar,
        bio,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
      },
    });

    const token = this.authService.generateToken(user.id);
    return {
      user,
      token,
    };
  }

  async signin(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.client.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials, User does not exist',
      );
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'User has no password, kindly contact support',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }

  async getProfile(userId: string) {
    return this.prisma.client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async resetPassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return this.prisma.client.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  }
}
