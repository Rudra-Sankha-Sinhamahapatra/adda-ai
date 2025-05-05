import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { UpdateCharacterDto } from './dto/updateCharacter.dto';

@Injectable()
export class CharacterService {
  constructor(private readonly prisma: PrismaService) {}

  async getCharacters() {
    const characters = await this.prisma.client.character.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        personality: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return characters;
  }

  async getCharacterById(id: string) {
    const character = await this.prisma.client.character.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        personality: true,
        imageUrl: true,
      },
    });
    return character;
  }

  async getCharactersByUserId(userId: string) {
    const characters = await this.prisma.client.character.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        personality: true,
        imageUrl: true,
      },
    });

    return characters;
  }

  async createCharacter(character: CreateCharacterDto) {
    const newCharacter = await this.prisma.client.character.create({
      data: character,
    });

    return newCharacter;
  }

  async updateCharacter(
    id: string,
    character: UpdateCharacterDto,
    req: { user: { userId: string } },
  ) {
    const isCharacter = await this.prisma.client.character.findUnique({
      where: { id },
    });
    if (!isCharacter) {
      throw new NotFoundException('Character not found');
    }
    if (isCharacter.userId !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to update this character',
      );
    }
    const updatedCharacter = await this.prisma.client.character.update({
      where: { id },
      data: character,
    });

    return updatedCharacter;
  }

  async deleteCharacter(id: string, req: { user: { userId: string } }) {
    const isCharacter = await this.prisma.client.character.findUnique({
      where: { id },
    });
    if (!isCharacter) {
      throw new NotFoundException('Character not found');
    }
    if (isCharacter.userId !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this character',
      );
    }
    const deletedCharacter = await this.prisma.client.character.delete({
      where: { id },
    });

    return deletedCharacter;
  }
}
