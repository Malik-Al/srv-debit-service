import { Module } from '@nestjs/common';
import { HistoryPaymentController } from './history.payment.controller';
import { HistoryPaymentService } from './history.payment.service';

@Module({
  imports: [
  ],
  controllers: [
    HistoryPaymentController
  ],
  providers: [
    HistoryPaymentService
  ]
})
export class HistoryPaymentModule { }
