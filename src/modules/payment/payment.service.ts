import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentDto } from './dtos/dto';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { User } from '../database/entities/user.entity';
import { DataSource } from 'typeorm';
import { Payments } from '../database/entities/history.payment';
import { Operations } from './type';

@Injectable()
export class PaymentService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly dataSource: DataSource,
  ) { }

  async debitingFunds(
    dto: PaymentDto,
    user: User,
    refId: string
  ) {
    this.logger.debug(
      `[START] debitingFunds 
      dto: ${JSON.stringify(dto)}
      user: ${JSON.stringify(user)}`,
      refId
    );
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { amount } = dto;

      if (user.balance < amount) {
        throw new BadRequestException("Insufficient balance");
      }

      user.balance -= amount;

      await queryRunner.manager.update(User,
        { user_id: user.user_id },
        { balance: user.balance }
      );

      await queryRunner.manager.save(Payments, {
        user_id: user.user_id,
        action: Operations.DEBIT,
        amount: amount
      }
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `[Error] debitingFunds error: ${JSON.stringify(error)}`,
        refId
      );
      throw error
    } finally {
      await queryRunner.release();
    }
  }

}