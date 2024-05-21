import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository, UpdateResult } from 'typeorm';
import { Product } from '../product.entity';

@Injectable()
export class ProductService {
 
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,

  ) {}
//add resto
async ajouter(date: any): Promise<Product> {
  return this.productRepository.save(date);
}
async findOneResto(condition: any): Promise<Product> {
  return this.productRepository.findOne(condition);
}
//delete resto
async deleteResto(id: number): Promise<void> {
  await this.productRepository.delete(id);
}
async updateResto(product: Product): Promise<Product> {
  return this.productRepository.save(product);
}
async findAllResto(): Promise<Product[]> {
  return await this.productRepository.find();
}
async update(id: number, Product: Product
): Promise<Product> {
  await this.productRepository.update(id, Product);
  return await this.productRepository.findOne({ where: { id } });
}


async findOneProduct(condition): Promise<Product> {
  return this.productRepository.findOne(condition);
}
async findOneitem(id: number): Promise<Product> {
  return await this.productRepository.findOne({ where: { id } });
}
async save(product: Product): Promise<Product> {
  return this.productRepository.save(product);
}

async updateProduct(id: string): Promise<void> {
  await this.productRepository.delete(id);
}
async updateProduct1(product: Product): Promise<Product> {
  return await this.productRepository.save(product);
}


async deleteItem(id: any): Promise<void> {
  await this.productRepository.delete(id);
}

async saveItems(product: Product): Promise<Product> {
  // Ici, on pourrait avoir des logiques spécifiques pour la gestion des items.
  return await this.productRepository.save(product);
}





}
