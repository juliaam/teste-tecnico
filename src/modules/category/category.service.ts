import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
    });
  }

  async findAll(options) {
    const [category, count] = await Promise.all([
      this.prisma.category.findMany(options),
      this.prisma.category.count({
        where: options.where || {},
      }),
    ]);
    return { rows: category, count };
  }

  async findOne(optFind) {
    try {
      return await this.prisma.category.findFirstOrThrow(optFind);
    } catch (error) {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
