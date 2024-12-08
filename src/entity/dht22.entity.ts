import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("dht22")
export class DHT22DatabaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  temperature: number;
  @Column()
  humidity: number;
  @CreateDateColumn()
  created_at: Date;
}
