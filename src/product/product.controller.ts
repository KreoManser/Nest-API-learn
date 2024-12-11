import { Post, Get, Delete, Patch, HttpCode } from '@nestjs/common';
import { Body, Controller, Param } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {
    return dto;
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    console.log(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    console.log(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    console.log(dto);
  }
}
