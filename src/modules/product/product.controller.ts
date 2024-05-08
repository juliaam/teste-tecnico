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

import { Prisma } from '@prisma/client';
import { handleMessage } from 'src/helpers/SucessMessage';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return { product, message: handleMessage('create') };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    include?: Prisma.ProductInclude,
    select?: Prisma.ProductSelect,
  ) {
    const optFind: OptionsFind = {
      where: {
        id: +id,
      },
    };

    if (include) {
      optFind.include = include;
    }

    if (select) {
      optFind.select = select;
    }

    const product = await this.productService.findOne(optFind);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return { product, message: handleMessage('read') };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(+id, updateProductDto);
    return { product, message: handleMessage('update') };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);
    return { product, message: handleMessage('delete') };
  }
}
