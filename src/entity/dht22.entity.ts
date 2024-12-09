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
  @Column('decimal', { scale: 2 })
  temperature: number;
  @Column('decimal', { scale: 2 })
  humidity: number;
  @CreateDateColumn()
  created_at: Date;
}
