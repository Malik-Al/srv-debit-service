import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { Payments } from '../entities/history.payment';
import { QueryDto } from 'src/modules/history-payments/dto/query';

@Injectable()
export class HistoryPaymentRepository {
    constructor(
        @InjectRepository(Payments)
        private readonly payments: Repository<Payments>,
        private readonly logger: CustomLogger,
    ) { }

    async getLatestPayments(
        query: QueryDto,
        userId: number,
        refId: string
    ): Promise<Payments[]> {
        this.logger.debug(
            `[START] getLatestPayments 
            query: ${JSON.stringify(query)} 
            userId: ${userId}`,
            refId
        );
        try {
            return this.payments.find({
                where: { user_id: userId },
                order: { created_at: 'DESC' },
                take: query.size ?? 10,
                skip: query.page ? (query.page - 1) * (query.size ?? 10) : 0,
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