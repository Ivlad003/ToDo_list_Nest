import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty()
  access_token: string;
}

export class Todo {
  userId: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  task: string;
  @ApiProperty({ default: false })
  done: boolean;
}

export class Task {
  @ApiProperty()
  value: string;
  @ApiProperty({ default: false })
  done: boolean;
}

export class User {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class PublicUser {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  username: string;
}

export class AuthDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
