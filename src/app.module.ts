import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
