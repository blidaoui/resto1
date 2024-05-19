import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpException, HttpStatus
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { Product } from '../product.entity';

@Controller('restaurant')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}
  //ajouter resto
  @Post('addresto')
  async addproduit(@Body('resto') resto: string, @Body('card') card: string) {
    return this.ProductService.ajouter({
      resto,
      card,
    });
  }

  @Delete(':id')
  async deleteResto(@Param('id') id: number): Promise<void> {
    //handle the error if resto not found
    const resto: any = await this.ProductService.findOneResto({
      where: { id },
    });
    if (!resto) {
      throw new Error('resto not found');
    }
    return this.ProductService.deleteResto(resto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    console.log(typeof id);

    const Product = await this.ProductService.findOneResto({ where: { id } });
    if (!Product) {
      throw new Error('Product not found');
    } else {
      return Product;
    }
  }
  //update resto
  @Put(':id')
  async update(@Param('id') id: number, @Body() resto: any): Promise<Product> {
    return this.ProductService.update(id, resto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.ProductService.findAllResto();
  }

  @Post(':id')
  async addcateg(
    @Param('id') id: number,
    @Body('card') card: any,
  ): Promise<Product> {
    const product: any = await this.ProductService.findOneProduct({
      where: { id },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    let categorieId = Object.keys(card)[0];
    let workflow = {
      [categorieId]: {
        rank: 1,
        type: 'categories',
        content: {},
        override: {},
      },
    };
    product.card.categories = { ...product.card.categories, ...card };
    product.card.workflow = { ...product.card.workflow, ...workflow };
    console.log({ '2': product.card.categories });
    console.log({ '3': product.card.workflow });

    return this.ProductService.save(product);
  }

  @Delete(':id/:idCategorie')
  async deleteCategory(
    @Param('id') id: number,
    @Param('idCategorie') idCategorie: string
  ) {
    try {
console.log(typeof(Number(id)));
console.log(typeof(idCategorie));

      
      const product:any = await this.ProductService.findOneResto({ where: { id:Number(id) } });
console.log({product});

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      if (!product.card || !product.card.categories) {
        throw new HttpException('Invalid product data', HttpStatus.BAD_REQUEST);
      }
console.log("cc",product.card.categories[idCategorie]);
console.log("cc1",product.card.categories);


      if (product.card.categories[idCategorie]) {
        delete product.card.categories[idCategorie];
        await this.ProductService.updateResto(product);
        return { message: `Category ${idCategorie} deleted successfully` };
      } else {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(`Failed to delete category: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get(':id/getcategories')
  // async findCategoriesByProductId(@Param('id') id:number): Promise<Product[]> {

  //   return await this.ProductService.findCategoriesByProductId(id);
  // }
  @Get(':id/categories')
  async getCategoriesByRestaurant(@Param('id') id: number):  Promise<Product[]> {
    const resto: any = await this.ProductService.findOneResto({ where: { id } });
    if (!resto) {
      throw new Error('Restaurant not found');
    }
    return resto.card.categories;
  }
  // @Get(':id/:idCategorie')
  // async getITem(@Param('id') id: number, @Param('idCategorie') idCategorie:number):  Promise<Product[]> {
  //   const resto: any = await this.ProductService.findOneResto({ where: { id } });
  //   if (!resto) {
  //     throw new Error('Restaurant not found');
  //   }
  //   return resto.card.categories[idCategorie].items;
  // }
  @Get(':idResto/:idCat/product')
  async findOneitem(
    @Param('idResto') idResto: number, 
    @Param('idCat') idCat: string
  ): Promise<any> {
    try {
      const product: any = await this.ProductService.findOneitem(idResto);
  
      // Vérifier si le produit existe
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Afficher le contenu de product.card.categories pour le diagnostic
      console.log('Product categories:', product.card.categories);
  
      // Vérifier si la catégorie existe
      const category = product.card.categories[idCat];
      if (!category) {
        throw new Error(`Category with ID ${idCat} not found`);
      }
  
      // Récupérer les items de la catégorie
      const items = category.items;
      let listproduct: any = [];
      items.forEach((el: any) => {
        let item = product.card.items[el];
        if (item) {
          listproduct.push({ ...item, idProduct: el });
        }
      });
  
      return listproduct;
    } catch (error) {
      console.error('Error in findOneitem:', error.message);
      throw error;
    }
  }
  
  
      /// add items
  @Post('addItem/:id')
  async additems(@Param('id') id: number, @Body('card') card: any,@Body('idCategorie') idCategorie:string): Promise<Product> {
    const Product: any = await this.ProductService.findOneProduct({ where: { id } });
    if (!Product) {
      throw new Error('items not found');
    }
    console.log({idCategorie});
    console.log({card});

    Product.card.categories[idCategorie].items = [...Product.card.categories[idCategorie].items,Object.keys(card)[0]];
    Product.card.items = {...Product.card.items,...card};

    console.log("cc",Product.card.categories[idCategorie]);
 
    return this.ProductService.saveItems(Product);
  }
   //ajouter Items
   @Post(':id/:idCategorie/addItem')
   async addItem(
     @Param('idCategorie') idCategorie: string,
     @Param('id') id: number,
     @Body('card') card: any,
   ): Promise<Product> {
     const product: any = await this.ProductService.findOneProduct(id);
     if (!product) {
       throw new Error('Product not found');
     }
     product.card.categories[idCategorie].items = [...product.card.categories[idCategorie].items, card.id];
     product.card.items = { ...product.card.items, [card.id]: { ...card } };
     return this.ProductService.saveItems(product);
   }

  /// delete categ
  @Delete(':id')
  async deleteitem(@Param('id') id: number): Promise<void> {
    //handle the error if resto not found
    const items: any = await this.ProductService.findOneResto({
      where: { id },
    });
    if (!items) {
      throw new Error('resto not found');
    }
    items.card.items = { ...items.card.items };

    return this.ProductService.deleteItem(items);
  }
}

