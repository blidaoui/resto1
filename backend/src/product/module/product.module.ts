import { TypeOrmModule} from '@nestjs/typeorm'
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';
import { Module } from '@nestjs/common';
import { Product } from '../product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
