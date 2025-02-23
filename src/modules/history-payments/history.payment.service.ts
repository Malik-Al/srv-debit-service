import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { HistoryPaymentRepository } from '../database/repository/history.payment.repository';

@Injectable()
export class HistoryPaymentService {
  constructor(
        private readonly logger: CustomLogger,
        private readonly historyPaymentRepository: HistoryPaymentRepository,
  ) {}

  async getOperationUser(
    query: any, 
    refId: string
  ){
    try {
      
    } catch (error) {
      throw error
    }
  }
}