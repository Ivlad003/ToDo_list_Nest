import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
