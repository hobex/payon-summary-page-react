import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createCheckout(): Promise<string> {
    return await this.appService.createCheckout();
  }
}
