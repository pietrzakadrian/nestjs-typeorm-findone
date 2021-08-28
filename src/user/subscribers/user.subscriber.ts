import { UtilsProvider } from 'src/auth/providers/utils.provider';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  public async beforeInsert({
    entity,
  }: InsertEvent<UserEntity>): Promise<void> {
    if (entity.password) {
      entity.password = await UtilsProvider.generateHash(entity.password);
    }
  }

  public async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity.password) {
      const password = await UtilsProvider.generateHash(entity.password);

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }
  }
}
