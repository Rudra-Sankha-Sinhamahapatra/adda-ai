import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  bio?: string;

  @IsString({ message: 'Avatar must be a string' })
  @IsOptional()
  avatar?: string;
}
