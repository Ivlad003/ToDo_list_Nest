import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

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

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class PublicUser {
  @ApiProperty()
  userId: number;

  @IsEmail()
  @ApiProperty()
  email: string;
}

export class AuthDto {
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
