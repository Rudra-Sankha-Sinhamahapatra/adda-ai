import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, CharacterModule],
})
export class AppModule {}
