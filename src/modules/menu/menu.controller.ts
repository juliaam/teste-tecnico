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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { TypeResponse, handleMessage } from 'src/helpers/SucessMessage';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() body: CreateMenuDto) {
    const menu = await this.menuService.create(body);
    return { menu, message: handleMessage(TypeResponse.CREATE) };
  }

  @Get('/daytime')
  async getByDayTime() {
    const hour = new Date().getHours();
    const daytime = hour >= 4 && hour <= 18 ? 'day' : 'night';

    const menu = await this.menuService.daytime(daytime);
    return { menu, message: handleMessage(TypeResponse.READ) };
  }

  @Get()
  async findAll() {
    const menu = await this.menuService.findAll();
    return { menu, message: handleMessage(TypeResponse.READ) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const menu = this.menuService.findOne(+id);

    return { menu, message: handleMessage(TypeResponse.READ) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMenuDto) {
    const menu = await this.menuService.update(+id, body);

    return { menu, message: handleMessage(TypeResponse.UPDATE) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const menu = await this.menuService.remove(+id);

    return { menu, message: handleMessage(TypeResponse.DELETE) };
  }
}
