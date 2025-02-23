import { Module } from '@nestjs/common';
import { HistoryPaymentController } from './history.payment.controller';
import { HistoryPaymentService } from './history.payment.service';
import { HistoryPaymentRepository } from '../database/repository/history.payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from '../database/entities/history.payment';
import { User } from '../database/entities/user.entity';
import { UserRepository } from '../database/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Payments
    ])
  ],
  controllers: [
    HistoryPaymentController
  ],
  providers: [
    HistoryPaymentService,
    HistoryPaymentRepository,
    UserRepository
  ]
})
export class HistoryPaymentModule { }
