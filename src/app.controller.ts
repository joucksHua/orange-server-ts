import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("apps")
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("app/getComments")
  getComments() {
    return this.appService.getComments();
  }
}
