import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(body: CreateProductDto) {
    const { categorys, ...rest } = body;

    const productTx = await this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: rest,
      });

      if (categorys) {
        await tx.product_category.createMany({
          data: categorys.map((categoryId) => ({
            id_category: categoryId,
            id_product: product.id,
          })),
        });
      }

      const productResult = await tx.product.findFirst({
        where: {
          id: product.id,
        },
        include: {
          product_category: {
            select: {
              category: true,
            },
          },
        },
      });

      return productResult;
    });
    return productTx;
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

  async findOne(optionsFind: {
    where?: {
      id: number;
    };
    include?: Prisma.productInclude;
    select?: Prisma.productSelect;
  }) {
    try {
      return await this.prisma.product.findFirstOrThrow(optionsFind);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, body: UpdateProductDto) {
    const { categorys, ...rest } = body;

    const categorysFind = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        product_category: {
          select: {
            id_category: true,
          },
        },
      },
    });

    const pastCategorys = categorysFind.product_category.map(
      (object) => object.id_category,
    );

    const categorysToDelete: number[] = pastCategorys.filter(
      (id) => !categorys.includes(id),
    );

    const categorysToAdd: number[] = categorys.filter(
      (id) => !pastCategorys.includes(id),
    );

    const productTx = await this.prisma.$transaction(async (tx) => {
      await tx.product_category.deleteMany({
        where: {
          id_category: {
            in: categorysToDelete,
          },
        },
      });

      await tx.product_category.createMany({
        data: categorysToAdd.map((categoryId) => ({
          id_category: categoryId,
          id_product: id,
        })),
      });

      await tx.product.update({
        where: {
          id: id,
        },
        data: rest,
      });

      const productResult = await tx.product.findFirst({
        where: {
          id: id,
        },
        include: {
          product_category: {
            select: {
              category: true,
            },
          },
        },
      });

      return productResult;
    });
    return productTx;
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
