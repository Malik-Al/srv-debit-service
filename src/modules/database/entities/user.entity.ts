import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users', 'schema': 'main' })
export class User {
  @ApiProperty({})
  @PrimaryGeneratedColumn()
  user_id: number;

  @ApiProperty({})
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  balance: number;
}
