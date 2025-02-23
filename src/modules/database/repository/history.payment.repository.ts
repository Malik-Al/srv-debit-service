import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { Payments } from '../entities/history.payment';

@Injectable()
export class HistoryPaymentRepository {
    constructor(
        @InjectRepository(Payments)
        private readonly payments: Repository<Payments>,
        private readonly logger: CustomLogger,
    ) { }

      async getLatestPayments(
        limit: number, 
        refId: string
    ): Promise<Payments[]> {
        this.logger.debug(
            `[START] getLatestPayments limit: ${JSON.stringify(limit)} `,
            refId
        );
        try {
            return this.payments.find({
              order: { created_at: 'DESC' },
              take: limit,
            });
        } catch (error) {
            this.logger.error(
                `[Error] getLatestPayments error: ${JSON.stringify(error)}`,
                refId
            );
            throw error;
        }
      }
}