import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import RequestWithUser from '../interfaces/request-with-user.interface';
import { AuthService } from '../services/auth.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const cookie = this.authenticationService.getCookieWithJwtToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', cookie);

    return request.user;
  }
}
