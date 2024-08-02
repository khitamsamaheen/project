import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";


@Entity("customer")
export class Customer {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ length: 255, nullable: false })
    name: string;
  
    @Column({ unique: true })
    mobilePhone: string;
  
    @Column("float")
    balance: number;
  static findOne: any;
  static find: any;
  static create: any;
  
  }