import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OptionsFind } from 'src/types/OptionsFind';

import { handleMessage } from 'src/helpers/SucessMessage';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);

    return { product, message: handleMessage('create') };
  }

  @Get()
  findAll() {
    const options = {};
    return this.productService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const optionsFind: OptionsFind = {
      where: {
        id: +id,
      },
      include: {
        product_category: {
          include: {
            category: true,
          },
        },
      },
    };

    const product = await this.productService.findOne(optionsFind);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return { product, message: handleMessage('read') };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const product = await this.productService.findOne({
      where: { id: +id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const newProduct = await this.productService.update(+id, body);
    return { newProduct, message: handleMessage('update') };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);
    return { product, message: handleMessage('delete') };
  }
}
