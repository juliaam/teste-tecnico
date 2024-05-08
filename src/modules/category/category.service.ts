import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OptionsFind } from 'src/types/OptionsFind';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
    });
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(optFind: OptionsFind) {
    return this.prisma.category.findFirst(optFind);
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
