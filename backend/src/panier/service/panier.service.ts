import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Panier } from '../panier.entity';


@Injectable()
export class PanierService {
    constructor(
        @InjectRepository(Panier)
        private readonly panierRepository:Repository<Panier>
    ){}
    
    async createPanier(Panier:any): Promise<Panier>{
        return this.panierRepository.save(Panier);
    }
    
    findPanier(condition: any): Promise<Panier[]> {
        return  this.panierRepository.find( condition );

    }

    findAllPanier(): Promise<Panier[]> {
        return this.panierRepository.find();
    }
    deletePanier(id_user: number): Promise<DeleteResult> {
        return this.panierRepository.delete({ id_user :id_user , etat: 'Non payée' });
    }
   updateEtat(id: number,etat_Commande:string): Promise<DeleteResult> {
        return this.panierRepository.update({id},{etat_Commande:etat_Commande});

    }
    updatePanier(id_user:number):Promise<UpdateResult>{
        return this.panierRepository.update({ id_user }, { etat: 'Payée' })
    }
    createEtatCommande(id:number):Promise<Panier>{
        return this.panierRepository.save({id});


    }
    // async updateEtat(panier: Panier): Promise<UpdateResult> {
    //     const { id, etat_Commande } = panier; // Assuming you have these properties in your Panier entity
    
    //     if (!id || !etat_Commande) {
    //       throw new Error('Panier object must contain id and etat_Commande');
    //     }
    
    //     return this.panierRepository.update(id, { etat_Commande });
    //   }
}