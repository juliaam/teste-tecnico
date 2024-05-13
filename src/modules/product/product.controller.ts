import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TypeResponse, handleMessage } from 'src/helpers/SucessMessage';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);

    return { product, message: handleMessage(TypeResponse.CREATE) };
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return { products, message: handleMessage(TypeResponse.READ) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);

    return { product, message: handleMessage(TypeResponse.READ) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const product = await this.productService.update(+id, body);

    return { product, message: handleMessage(TypeResponse.UPDATE) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);

    return { product, message: handleMessage(TypeResponse.DELETE) };
  }
}
