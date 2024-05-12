import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductOptionsPrisma } from 'src/prisma/helpers/options-prisma.type';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create(body: CreateProductDto) {
    return this.prisma.product.create({
      data: body,
    });
  }
  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.findFirst({
      where: { id },
    });

    if (!product) throw new NotFoundException('Produto não encontrado');

    return product;
  }

  async update(id: number, body: UpdateProductDto) {
    const productExists = await this.findFirst({
      where: { id },
    });

    if (!productExists) throw new NotFoundException('Produto não encontrado');

    const product = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: body,
    });

    return product;
  }

  async remove(id: number) {
    const categoryExists = await this.findFirst({
      where: { id },
    });

    if (!categoryExists) throw new NotFoundException('Produto não encontrada');

    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }

  private findFirst(options: ProductOptionsPrisma) {
    return this.prisma.product.findFirst(options);
  }
}
