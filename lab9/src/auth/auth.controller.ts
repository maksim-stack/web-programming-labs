import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return user;
  }
}