import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto, User } from '../model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      email: 'john@gmail.com',
      password: 'changeme',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  addNewUserIfNotExist(authDto: AuthDto) {
    if (!this.users.find((u) => u.email === authDto.email)) {
      this.users.push({
        userId: new Date().getTime(),
        email: authDto.email,
        password: authDto.password,
      });
    } else {
      throw new BadRequestException('User already exists');
    }
  }
}
