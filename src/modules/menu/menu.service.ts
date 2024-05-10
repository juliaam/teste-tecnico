import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateMenuDto) {
    return this.prisma.menu.create({
      data: body,
    });
  }

  async findAll(options) {
    const [menu, count] = await Promise.all([
      this.prisma.menu.findMany(options),
      this.prisma.menu.count({
        where: options.where || {},
      }),
    ]);
    return { rows: menu, count };
  }

  findOne(optFind) {
    return this.prisma.menu.findFirst(optFind);
  }

  update(id: number, body: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: {
        id: id,
      },
      data: body,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({
      where: {
        id: id,
      },
    });
  }
}
