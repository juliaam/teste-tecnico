import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCategoryCreate } from 'src/types/product-category';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  createMany(data: ProductCategoryCreate[], tx?: any) {
    const prisma = tx ?? this.prisma;

    return prisma.product_category.createMany({
      data,
    });
  }

  // async findAll(options) {
  //   const [category, count] = await Promise.all([
  //     this.prisma.category.findMany(options),
  //     this.prisma.category.count({
  //       where: options.where || {},
  //     }),
  //   ]);
  //   return { rows: category, count };
  // }

  // findOne(optFind: OptionsFind) {
  //   return this.prisma.category.findFirst(optFind);
  // }

  // update(id: number, data: UpdateCategoryDto) {
  //   return this.prisma.category.update({
  //     where: {
  //       id: id,
  //     },
  //     data: data,
  //   });
  // }

  // remove(id: number) {
  //   return this.prisma.category.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
