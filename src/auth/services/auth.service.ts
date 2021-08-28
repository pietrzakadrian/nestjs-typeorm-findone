import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { RegisterDto } from '../dtos/register.dto';
import { UtilsProvider } from '../providers/utils.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto): Promise<UserEntity> {
    return this.userService.create(registrationData);
  }

  public async getAuthenticatedUser(
    username: string,
    plainTextPassword: string,
  ): Promise<UserEntity> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      /**
       * the same exception is given to protect the controller from API attacks
       */
      throw new BadRequestException();
    }

    const isPasswordMatching = await UtilsProvider.validateHash(
      plainTextPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException();
    }

    return user;
  }

  public getCookieWithJwtToken(userId: number): string {
    const payload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
