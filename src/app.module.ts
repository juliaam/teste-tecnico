import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { MenuModule } from './modules/menu/menu.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductModule, CategoryModule, MenuModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
