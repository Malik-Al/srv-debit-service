import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { HistoryPaymentRepository } from '../database/repository/history.payment.repository';
import { QueryDto } from './dto/query';

@Injectable()
export class HistoryPaymentService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly historyPaymentRepository: HistoryPaymentRepository,
  ) { }

  async getOperationUser(
    query: QueryDto,
    userId: number,
    refId: string
  ) {
    this.logger.debug(`[START] getOperationUser
      query: ${JSON.stringify(query)}
      userId: ${userId}`,
      refId
    );
    try {
      return await this.historyPaymentRepository.getLatestPayments(
        query, 
        userId, 
        refId
      );
    } catch (error) {
      this.logger.error(`
        [Error] getOperationUser error: ${JSON.stringify(error)}`,
        refId
      );
      throw error
    }
  }
}
