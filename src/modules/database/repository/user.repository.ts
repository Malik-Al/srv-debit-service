import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, } from 'typeorm';
import { User } from '../entities/user.entity';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>,
        private readonly logger: CustomLogger,
    ) { }

    async findByValue(
        value: object,
        refId: string
    ): Promise<User> {
        this.logger.debug(
            `[START] findByValue value: ${JSON.stringify(value)} `,
            refId
        );
        try {
            return await this.user.findOne({ where: value });
        } catch (error) {
            this.logger.error(
                `[Error] findByValue error: ${JSON.stringify(error)}`,
                refId
            );
            throw error;
        }
    }
}