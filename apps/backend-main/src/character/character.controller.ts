import {
  // Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Post,
  // Put,
  // Request,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
// import { CreateCharacterDto } from './dto/createCharacter.dto';
// import { UpdateCharacterDto } from './dto/updateCharacter.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  // @Post('create-character')
  // createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
  //   return this.characterService.createCharacter(createCharacterDto);
  // }

  // @Put('update-character/:id')
  // updateCharacter(
  //   @Param('id') id: string,
  //   @Body() updateCharacterDto: UpdateCharacterDto,
  //   @Request() req: { user: { userId: string } },
  // ) {
  //   return this.characterService.updateCharacter(id, updateCharacterDto, req);
  // }

  @UseGuards(AuthGuard)
  @Get('all-characters')
  allCharacters() {
    return this.characterService.getCharacters();
  }

  @UseGuards(AuthGuard)
  @Get('character/:id')
  getCharacterById(@Param('id') id: string) {
    return this.characterService.getCharacterById(id);
  }

  // @UseGuards(AuthGuard)
  // @Delete('character/:id')
  // deleteCharacter(
  //   @Param('id') id: string,
  //   @Request() req: { user: { userId: string } },
  // ) {
  //   return this.characterService.deleteCharacter(id, req);
  // }

  @UseGuards(AuthGuard)
  @Get('characters-by-user/:userId')
  getCharactersByUserId(@Param('userId') userId: string) {
    return this.characterService.getCharactersByUserId(userId);
  }
}
