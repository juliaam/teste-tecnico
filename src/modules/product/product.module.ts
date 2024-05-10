import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCategoryService } from 'src/services/product-category.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductCategoryService],
})
export class ProductModule {}
