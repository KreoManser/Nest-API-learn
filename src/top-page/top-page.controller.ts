import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Delete, Get, Patch, Post } from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-pog-page.dto';
import { IdValidtionPipe } from 'src/pipes/id-validation.pipe';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return await this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidtionPipe) id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return topPage;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidtionPipe) id: string) {
    const oldPage = await this.topPageService.deleteById(id);
    if (!oldPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return oldPage;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidtionPipe) id: string, @Body() dto: CreateTopPageDto) {
    const newPage = await this.topPageService.updateById(id, dto);
    if (!newPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return newPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return await this.topPageService.findByText(text);
  }
}
