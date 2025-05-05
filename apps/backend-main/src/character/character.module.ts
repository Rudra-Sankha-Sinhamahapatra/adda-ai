import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
