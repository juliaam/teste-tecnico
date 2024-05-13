import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TypeResponse, handleMessage } from 'src/helpers/SucessMessage';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return { category, message: handleMessage(TypeResponse.CREATE) };
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();

    return { categories, message: handleMessage(TypeResponse.READ) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);

    return { category, message: handleMessage(TypeResponse.READ) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const category = await this.categoryService.update(+id, body);

    return { category, message: handleMessage(TypeResponse.UPDATE) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(+id);

    return { category, message: handleMessage(TypeResponse.DELETE) };
  }
}
