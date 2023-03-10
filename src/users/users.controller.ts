import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthDto, JwtPayload, PublicUser } from '../model';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: AuthDto })
  @Post('auth/login')
  @ApiCreatedResponse({
    type: JwtPayload,
  })
  async login(@Body() authDto: AuthDto): Promise<JwtPayload> {
    return this.authService.login(authDto);
  }

  @Post('auth/register')
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, description: 'New user was created.' })
  @ApiResponse({ status: 400, description: 'Exist user.' })
  async register(@Body() authDto: AuthDto) {
    this.authService.register(authDto);
  }

  @ApiBearerAuth('my-token')
  @ApiHeader({
    name: 'my-token',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: PublicUser,
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
