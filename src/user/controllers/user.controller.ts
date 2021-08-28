import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { RoleType } from '../constants/role-type.constant';
import { UserEntity } from '../entities/user.entity';

@Controller('Users')
export class UserController {
  @Get()
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  public async getUser(@Req() request: RequestWithUser): Promise<UserEntity> {
    return request.user;
  }
}
