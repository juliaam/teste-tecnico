import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CategoryOptionsPrisma } from 'src/prisma/helpers/options-prisma.type';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.findFirst({
      where: { id },
      include: {
        product: true,
      },
    });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    return category;
  }

  async update(id: number, body: UpdateCategoryDto) {
    const categoryExists = await this.findFirst({
      where: { id },
    });

    if (!categoryExists)
      throw new NotFoundException('Categoria não encontrada');

    const category = await this.prisma.category.update({
      where: {
        id: id,
      },
      data: body,
    });

    return category;
  }

  async remove(id: number) {
    const categoryExists = await this.findFirst({
      where: { id },
    });

    if (!categoryExists)
      throw new NotFoundException('Categoria não encontrada');

    const isProductBond = await this.prisma.product.findMany({
      where: {
        idCategory: id,
      },
    });

    if (isProductBond.length > 0)
      throw new BadRequestException('Existem produtos vinculados');

    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }

  private findFirst(options: CategoryOptionsPrisma) {
    return this.prisma.category.findFirst(options);
  }
}
