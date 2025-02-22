import { Module } from '@nestjs/common';
import { HistoryPaymentModule } from './modules/history-payments/history.payment.module';
import { PaymentModule } from './modules/payment/payment.module';
// import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    HistoryPaymentModule,
    PaymentModule,
    // DatabaseModule
  ],
})
export class AppModule {}
