import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TodoListController } from './todo-list/todo-list.controller';
import { TodoListService } from './todo-list/todo-list.service';
import { TodoListModule } from './todo-list/todo-list.module';
import { UsersController } from './users/users.controller';
import { AppController } from './app/app.controller';

@Module({
  imports: [AuthModule, UsersModule, TodoListModule],
  controllers: [UsersController, TodoListController, AppController],
  providers: [UsersService, TodoListService],
})
export class AppModule {}
