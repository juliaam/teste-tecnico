import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuOptionsPrisma } from 'src/prisma/helpers/options-prisma.type';
import { TDayTime } from 'src/enums/daytime-menu';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateMenuDto) {
    const menu = await this.prisma.menu.create({
      data: {
        name: body.name,
        daytime: body.daytime,
        MenuProduct: {
          create: body.products.map((idProduct) => ({ idProduct: idProduct })),
        },
      },
      include: {
        MenuProduct: true,
      },
    });
    return menu;
  }

  async daytime(daytime: TDayTime) {
    const menu = await this.prisma.menu.findFirst({
      where: {
        daytime: daytime,
      },
      include: {
        MenuProduct: {
          select: {
            product: {
              select: {
                name: true,
                description: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!menu) throw new NotFoundException('Menu não encontrado');

    return menu;
  }

  async findAll() {
    return this.prisma.menu.findMany();
  }

  async findOne(id: number) {
    const menu = await this.findFirst({
      where: { id },
      include: {
        MenuProduct: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!menu) throw new NotFoundException('Menu não encontrado');

    return menu;
  }

  update(id: number, body: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        daytime: body.daytime,
        // MenuProduct: {
        //   connect: {
        //     idMenu_idProduct:
        //   },
        // },
      },
    });
  }

  async remove(id: number) {
    const menuExists = await this.findFirst({
      where: { id },
    });

    if (!menuExists) throw new NotFoundException('Menu não encontrado');

    return this.prisma.menu.delete({
      where: {
        id: id,
      },
    });
  }

  private findFirst(options: MenuOptionsPrisma) {
    return this.prisma.menu.findFirst(options);
  }
}
