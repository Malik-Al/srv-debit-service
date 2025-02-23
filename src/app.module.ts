import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HistoryPaymentModule } from './modules/history-payments/history.payment.module';
import { PaymentModule } from './modules/payment/payment.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from './helpers/logger/logger.module';
import { DefMiddleware } from './middlewares/default.middleware';

@Module({
  imports: [
    HistoryPaymentModule,
    PaymentModule,
    DatabaseModule,
    LoggerModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DefMiddleware).forRoutes('*');
  }
}
