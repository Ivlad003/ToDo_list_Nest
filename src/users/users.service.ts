import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto, User } from '../model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  addNewUserIfNotExist(authDto: AuthDto) {
    if (!this.users.find((u) => u.username === authDto.username)) {
      this.users.push({
        userId: new Date().getTime(),
        username: authDto.username,
        password: authDto.password,
      });
    } else {
      throw new BadRequestException('User already exists');
    }
  }
}
