import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }
  async validate(username: string, password: string): Promise<UserEntity> {
    return this.authenticationService.getAuthenticatedUser(username, password);
  }
}
