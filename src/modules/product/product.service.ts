import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Options } from 'src/types/OptionsFind';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create(body: CreateProductDto) {
    return this.prisma.product.create({
      data: body,
    });
  }
  async findAll(options) {
    const [product, count] = await Promise.all([
      this.prisma.product.findMany(options),
      this.prisma.product.count({
        where: options.where || {},
      }),
    ]);
    return { rows: product, count };
  }

  async findOne(options: Options<Prisma.productInclude, Prisma.productSelect>) {
    try {
      return await this.prisma.product.findFirstOrThrow(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, body: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: body,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
