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
import { handleMessage } from 'src/helpers/SucessMessage';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() body: CreateMenuDto) {
    const menu = await this.menuService.create(body);
    return { menu, message: handleMessage('create') };
  }

  @Get('/daytime')
  async getByDayTime() {
    const hour = new Date('2024-05-10T04:04:00').getHours();
    const daytime = hour >= 4 && hour <= 18 ? 'day' : 'night';

    const opt = {
      where: {
        daytime: daytime,
      },
      include: {
        menu_product: {
          select: {
            product: true,
          },
        },
      },
    };

    const menu = await this.menuService.findOne(opt);
    return menu;
  }

  @Get()
  findAll() {
    const options = {};
    return this.menuService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const optFind = {
      where: {
        id: +id,
      },
    };

    const menu = await this.menuService.findOne(optFind);

    return { menu, message: handleMessage('read') };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMenuDto) {
    const menu = await this.menuService.findOne({
      where: { id: +id },
    });

    if (!menu) {
      throw new NotFoundException('Produto não encontrado');
    }

    const newMenu = await this.menuService.update(+id, body);
    return { newMenu, message: handleMessage('update') };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const opt = {
      where: {
        id: +id,
      },
    };

    const menu = await this.menuService.findOne(opt);

    if (!menu) {
      throw new NotFoundException('Produto não encontrado');
    }

    const deletedMenu = await this.menuService.remove(+id);

    return { deletedMenu, message: handleMessage('delete') };
  }
}
