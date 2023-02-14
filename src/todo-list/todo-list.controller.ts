import {
  Controller,
  UseGuards,
  Request,
  Body,
  Get,
  Post,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { Todo, Task } from '../model';

@ApiHeader({
  name: 'my-token',
  description: 'Bearer token',
})
@Controller('todo-list')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCreatedResponse({
    type: [Todo],
  })
  getTodosForUser(@Request() req): Todo[] {
    const userId = req.user.userId;
    return this.todoListService.getTodosForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: Task })
  @ApiCreatedResponse({
    type: [Todo],
  })
  @Post('/add')
  addTodoForUser(@Request() req, @Body() task: Task): Todo[] {
    const userId = req.user.userId;
    return this.todoListService.addTodoForUser(userId, task);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: [Todo],
  })
  @Delete('one/:id')
  deleteTodoByIdForUser(@Request() req, @Param('id') id: number): Todo[] {
    const userId = req.user.userId;
    return this.todoListService.deleteTodoByIdForUser(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('one/:id')
  @ApiBody({ type: Task })
  @ApiCreatedResponse({
    type: [Todo],
  })
  updateTodoByIdForUser(
    @Request() req,
    @Param('id') id: number,
    @Body() task: Task,
  ): Todo[] {
    const userId = req.user.userId;
    return this.todoListService.updateTodoByIdForUser(userId, id, task);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: [Todo],
  })
  @Get('one/:id')
  getTodoByIdForUser(@Request() req, @Param('id') id: number): Todo[] {
    const userId = req.user.userId;
    return this.todoListService.getTodoByIdForUser(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: [Todo],
  })
  @Post('toggle/one/:id')
  toggleTodoByIdForUser(@Request() req, @Param('id') id: number): Todo[] {
    const userId = req.user.userId;
    return this.todoListService.toggleTodoByIdForUser(userId, id);
  }
}
