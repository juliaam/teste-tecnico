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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { handleMessage } from 'src/helpers/SucessMessage';
import { OptionsFind } from 'src/types/OptionsFind';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return { category, message: handleMessage('create') };
  }

  @Get()
  findAll() {
    const options = {};
    return this.categoryService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const optFind: OptionsFind = {
      where: {
        id: +id,
      },
    };

    const category = await this.categoryService.findOne(optFind);

    if (!category) {
      throw new NotFoundException('Produto não encontrado');
    }

    return { category, message: handleMessage('read') };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const category = await this.categoryService.update(+id, body);
    return { category, message: handleMessage('update') };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(+id);
    return { category, message: handleMessage('delete') };
  }
}
