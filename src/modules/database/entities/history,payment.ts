import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({name: 'payments', 'schema': 'main'})
export class Payments {
  @ApiProperty({})  
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ApiProperty({})  
  @ManyToOne(() => User, { nullable: false})
  @Column({nullable: false})
  user_id: number;

  @ApiProperty({})  
  @Column({ type: 'varchar', length: 50, nullable: false })
  action: string;

  @ApiProperty({})  
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: string;

  @ApiProperty({})  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
