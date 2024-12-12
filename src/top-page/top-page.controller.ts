import { Body, Controller, HttpCode, Param } from '@nestjs/common';
import { Delete, Get, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './models/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
// import { ConfigService } from '@nestjs/config';

@Controller('top-page')
export class TopPageController {
  // constructor(private readonly configService: ConfigService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    console.log(id);
  }

  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    return dto;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    console.log(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    console.log(dto);
  }
}
