import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  userId: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  task: string;
  @ApiProperty()
  done: boolean;
}

export class Task {
  @ApiProperty()
  value: string;
  @ApiProperty()
  done: boolean;
}

@Injectable()
export class TodoListService {
  private readonly todos: Todo[] = [
    {
      userId: 1,
      id: 1,
      task: 'get milk',
      done: false,
    },
  ];

  getTodosForUser(userId: number): Todo[] {
    return this.todos.filter((todo) => todo.userId === userId);
  }

  addTodoForUser(userId: number, task: Task): Todo[] {
    const newTodo = new Todo();
    newTodo.id = new Date().getTime();
    newTodo.userId = userId;
    newTodo.task = task.value;
    this.todos.push(newTodo);
    return this.todos;
  }

  deleteTodoByIdForUser(userId: number, id: number): Todo[] {
    const todos = this.getTodosForUser(userId);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(index, 1);
    return this.todos;
  }

  updateTodoByIdForUser(userId: number, id: number, task: Task): Todo[] {
    const todos = this.getTodosForUser(userId);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos[index] = {
      ...this.todos[index],
      done: task.done,
      task: task.value,
    };
    return this.todos;
  }

  getTodoByIdForUser(userId: number, id: number): Todo[] {
    const todos = this.getTodosForUser(userId);
    return todos.filter((todo) => todo.id === id) || [];
  }
}
