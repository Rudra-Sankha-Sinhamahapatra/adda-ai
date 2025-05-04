import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWT_SECRET } from '@repo/backend-common/jwt';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

type RequestWithUser = Request & {
  user: JwtPayload;
  headers: {
    authorization?: string;
  };
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
      request.user = payload;
      return Promise.resolve(true);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token?.trim() : undefined;
  }
}
