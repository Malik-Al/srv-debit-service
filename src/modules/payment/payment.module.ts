import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Payments } from '../database/entities/history.payment';
import { UserRepository } from '../database/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Payments
    ])
  ],
  controllers: [
    PaymentController
  ],
  providers: [
    PaymentService,
    UserRepository
  ]
})
export class PaymentModule { }
