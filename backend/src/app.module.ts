import {ConfigModule} from'@nestjs/config';
import { TypeOrmModule} from '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { ProductModule } from './product/module/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/module/user.module';
import { PanierModule } from './panier/module/panier.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string> process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,

    }),

  UserModule,
  ProductModule,
  PanierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
