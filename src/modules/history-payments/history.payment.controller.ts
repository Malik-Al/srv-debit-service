import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RefId } from 'src/decorators/ref.decorator';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { IResponse } from 'src/helpers/types/response.type';
import { HistoryPaymentService } from './history.payment.service';
import { CustomRequest } from 'src/decorators/check-user';

@Controller('history-payment')
export class HistoryPaymentController {
  constructor(
    private readonly logger: CustomLogger,
    private readonly historyPaymentService: HistoryPaymentService,
  ) { }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async userOperationHistoryController(
    @RefId() refId: string,
    @Req() req: CustomRequest,
    @Param('id') id: number,
    @Query() query: any
  ): Promise<IResponse<any>> {
    this.logger.info(`
        [START] userOperationHistoryController query: ${JSON.stringify(query)}`,
      refId
    );
    try {
      this.logger.info(`
          [SUCCESS] userOperationHistoryController `,
        refId
      );

      await this.historyPaymentService.getOperationUser(
        query, 
        refId
      );
      return {
        success: true,
        code: 200
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