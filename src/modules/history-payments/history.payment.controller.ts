import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RefId } from 'src/decorators/ref.decorator';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { IResponse } from 'src/helpers/types/response.type';
import { HistoryPaymentService } from './history.payment.service';
import { CheckUserGuard, CustomRequest } from 'src/decorators/check-user';
import { QueryDto } from './dto/query';

@Controller('history-payment')
export class HistoryPaymentController {
  constructor(
    private readonly logger: CustomLogger,
    private readonly historyPaymentService: HistoryPaymentService,
  ) { }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(CheckUserGuard)
  async userOperationHistoryController(
    @RefId() refId: string,
    @Req() req: CustomRequest,
    @Query() query: QueryDto
  ): Promise<IResponse<any>> {
    this.logger.info(`
        [START] userOperationHistoryController 
        query: ${JSON.stringify(query)}`,
      refId
    );
    try {
      this.logger.info(`
          [SUCCESS] userOperationHistoryController `,
        refId
      );

      const response = await this.historyPaymentService.getOperationUser(
        query, 
        Number(req.params.id),
        refId
      );

      return {
        success: true,
        code: 200,
        data: response
      }

    } catch (error) {
      this.logger.error(`
          [Error] userOperationHistoryController error: ${JSON.stringify(error)}`,
        refId
      );
      throw error;
    }
  }
}