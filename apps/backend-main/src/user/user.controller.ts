import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.userService.signup(signUpDto);
  }

  @Post('signin')
  signin(@Body() signInDto: SignInDto) {
    return this.userService.signin(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.userService.getProfile(req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  updateProfile(
    @Request() req: { user: { userId: string } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(req.user.userId, updateUserDto);
  }
}
