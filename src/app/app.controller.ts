import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  _healthcheck() {
    return 'Alive!';
  }
}
