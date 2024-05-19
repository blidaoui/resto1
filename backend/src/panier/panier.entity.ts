import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Panier{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'jsonb' }) // Change the data type to 'jsonb'
    cartItem: string;

    @Column({default:"non payé"})
    etat:string

    @Column({ type: 'float',default: 0.00})
    prix:number;

    @Column({})
    id_user:number;

    @Column({ type: 'jsonb', default:null })
    ModeRetrait:string;

    @Column({default:"En attente"})
    etat_Commande:string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;
}