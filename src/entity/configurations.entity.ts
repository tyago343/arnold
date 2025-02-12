import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("configurations")
export class ConfigurationDatabaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  key: string;
  @Column()
  value: string;
  @CreateDateColumn()
  created_at: Date;
}
