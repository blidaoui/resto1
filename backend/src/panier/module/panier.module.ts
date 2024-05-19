import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from '../panier.entity';
import { PanierService } from '../service/panier.service';
import { PanierController } from '../controller/panier.controller';

@Module({  imports:[
  TypeOrmModule.forFeature([Panier]),
  
],
  providers: [PanierService],
  controllers: [PanierController]
})
export class PanierModule {}