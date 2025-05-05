import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateCharacterDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString({ message: 'Personality must be a string' })
  @IsNotEmpty({ message: 'Personality is required' })
  personality: string;

  @IsString({ message: 'Image URL must be a string' })
  @IsNotEmpty({ message: 'Image URL is required' })
  imageUrl: string;

  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}
