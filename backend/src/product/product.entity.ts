import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ type: 'jsonb' })
    resto:string;
    @Column({ type: 'jsonb' })
    card:string;
}
