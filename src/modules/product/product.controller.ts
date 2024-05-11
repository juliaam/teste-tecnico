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
import { Options } from 'src/types/OptionsFind';

import { handleMessage } from 'src/helpers/SucessMessage';
import { Prisma } from '@prisma/client';

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
    const options: Options<Prisma.productInclude, Prisma.productSelect> = {
      where: {
        id: +id,
      },
      include: {
        category: true,
      },
    };

    const product = await this.productService.findOne(options);

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
    const opt = {
      where: {
        id: +id,
      },
    };

    const product = await this.productService.findOne(opt);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const deletedProduct = await this.productService.remove(+id);

    return { deletedProduct, message: handleMessage('delete') };
  }
}
