import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
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
  //delete resto
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
  //get resto by id
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
  //get all resto
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.ProductService.findAllResto();
  }
  //add categories
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
  //delete categorie by id resto
  @Delete(':id/:idCategorie')
  async deleteCategory(
    @Param('id') id: number,
    @Param('idCategorie') idCategorie: string,
  ) {
    try {
      console.log(typeof Number(id));
      console.log(typeof idCategorie);

      const product: any = await this.ProductService.findOneResto({
        where: { id: Number(id) },
      });
      console.log({ product });

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      if (!product.card || !product.card.categories) {
        throw new HttpException('Invalid product data', HttpStatus.BAD_REQUEST);
      }
      console.log('cc', product.card.categories[idCategorie]);
      console.log('cc1', product.card.categories);

      if (product.card.categories[idCategorie]) {
        delete product.card.categories[idCategorie];
        await this.ProductService.updateResto(product);
        return { message: `Category ${idCategorie} deleted successfully` };
      } else {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        `Failed to delete category: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //afficher categorie by id resto
  @Get(':id/categories')
  async getCategoriesByRestaurant(@Param('id') id: number): Promise<Product[]> {
    const resto: any = await this.ProductService.findOneResto({
      where: { id },
    });
    if (!resto) {
      throw new Error('Restaurant not found');
    }
    return resto.card.categories;
  }
  //afficher produit(items) by id resto & categorie
  @Get(':idResto/:idCat/product')
  async findOneitem(
    @Param('idResto') idResto: number,
    @Param('idCat') idCat: string,
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
  @Post('addItem/:id/:idCategorie')
  async additems(
    @Param('id') id: number,
    @Param('idCategorie') idCategorie: string,
    @Body('card') card: any,
  ): Promise<Product> {
    const Product: any = await this.ProductService.findOneProduct({
      where: { id },
    });
    if (!Product) {
      throw new Error('items not found');
    }
    console.log({ idCategorie });
    console.log({ card });

    Product.card.categories[idCategorie].items = [
      ...Product.card.categories[idCategorie].items,
      Object.keys(card)[0],
    ];
    Product.card.items = { ...Product.card.items, ...card };

    console.log('cc', Product.card.categories[idCategorie]);

    return this.ProductService.saveItems(Product);
  }
  /// Delete items
  @Delete('deleteItem/:id/:idCategorie/:itemId')
  async deleteItem(
    @Param('id') id: number,
    @Param('idCategorie') idCategorie: string,
    @Param('itemId') itemId: string,
  ): Promise<Product> {
    const Product: any = await this.ProductService.findOneProduct({
      where: { id },
    });
    if (!Product) {
      throw new Error('Product not found');
    }

    const category = Product.card.categories[idCategorie];
    if (!category) {
      throw new Error('Category not found');
    }

    const itemIndex = category.items.indexOf(itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }

    // Remove item from category items
    category.items.splice(itemIndex, 1);

    // Remove item from product items
    delete Product.card.items[itemId];

    console.log('Updated category:', Product.card.categories[idCategorie]);

    return this.ProductService.saveItems(Product);
  }
  /// get items
  @Get('getItem/:id/:idCategorie/:itemId')
  async getItem(
    @Param('id') id: number,
    @Param('idCategorie') idCategorie: string,
    @Param('itemId') itemId: string,
  ): Promise<any> {
    const product: any = await this.ProductService.findOneProduct({
      where: { id },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const category = product.card.categories[idCategorie];
    if (!category) {
      throw new Error('Category not found');
    }

    const item = category.items.find(item => item === itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    return { item, details: product.card.items[itemId] };
  }
  /// put items
  @Put('updateItem/:id/:idCategorie/:itemId')
  async updateItem(
    @Param('id') id: number,
    @Param('idCategorie') idCategorie: string,
    @Param('itemId') itemId: string,
    @Body('card') updatedCard: any,
  ): Promise<any> {
    
    // Récupération du produit
    const product: any = await this.ProductService.findOneProduct({
      where: { id },
    });
    
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  
    // Vérifier l'existence de la catégorie
    const category = product.card.categories[idCategorie];
    console.log({category});
    
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  // let resto=
    // Vérifier l'existence de l'item
    
    if (!product.card.items[itemId]) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
  
    // Mise à jour de l'item
    product.card.items[itemId] = {...updatedCard
    };
  
    // Sauvegarde des modifications
    await this.ProductService.saveItems(product);
  
    return { message: `Item ${itemId} updated successfully` };
  }
  

}
