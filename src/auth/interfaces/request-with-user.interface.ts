import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}
