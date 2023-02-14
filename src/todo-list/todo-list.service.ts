import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, Todo } from '../model';

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
    return this.todos.filter((todo) => todo.userId == userId);
  }

  addTodoForUser(userId: number, task: Task): Todo[] {
    const newTodo = new Todo();
    newTodo.id = new Date().getTime();
    newTodo.userId = userId;
    newTodo.task = task.value;
    newTodo.done = false;
    this.todos.push(newTodo);
    return this.getTodosForUser(userId);
  }

  deleteTodoByIdForUser(userId: number, id: number): Todo[] {
    const index = this.todos.findIndex(
      (todo) => todo.id === Number(id) && todo.userId === userId,
    );
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(index, 1);
    return this.getTodosForUser(userId);
  }

  updateTodoByIdForUser(userId: number, id: number, task: Task): Todo[] {
    const index = this.todos.findIndex(
      (todo) => todo.id === Number(id) && todo.userId === userId,
    );
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos[index] = {
      ...this.todos[index],
      done: task.done,
      task: task.value,
    };
    return this.getTodosForUser(userId);
  }

  getTodoByIdForUser(userId: number, id: number): Todo[] {
    const todos = this.getTodosForUser(userId);
    return todos.filter((todo) => todo.id == id) || [];
  }

  toggleTodoByIdForUser(userId: number, id: number): Todo[] {
    const index = this.todos.findIndex(
      (todo) => todo.id === Number(id) && todo.userId === userId,
    );
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos[index] = {
      ...this.todos[index],
      done: !this.todos[index].done,
    };
    return this.getTodosForUser(userId);
  }
}
