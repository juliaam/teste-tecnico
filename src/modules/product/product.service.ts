import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OptionsFind } from 'src/types/OptionsFind';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(optFind: OptionsFind) {
    return this.prisma.product.findFirst(optFind);
  }

  update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: data,
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
