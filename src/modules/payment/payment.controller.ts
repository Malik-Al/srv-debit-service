import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RefId } from 'src/decorators/ref.decorator';
import { PaymentDto, ResponseSuccesCreate } from './dto/dto';
import { PaymentService } from './payment.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { CheckUserGuard, CustomRequest } from 'src/decorators/check-user';
import { IResponse } from 'src/helpers/types/response.type';
import { ApiResponse } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly logger: CustomLogger,
  ) { }

  @Post()
  @ApiResponse({ status: 200, type: ResponseSuccesCreate })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(CheckUserGuard)
  async paymentController(
    @Body() dto: PaymentDto,
    @Req() req: CustomRequest,
    @RefId() refId: string
  ): Promise<IResponse<PaymentDto>> {
    this.logger.info(`
          [START] paymentController dto: ${JSON.stringify(dto)}`,
      refId
    );
    try {
      await this.paymentService.debitingFunds(
        dto,
        req.user,
        refId
      );

      this.logger.info(`
        [SUCCESS] paymentController `,
        refId
      );
      return {
        success: true,
        code: 200
      }
    } catch (error) {
      this.logger.error(`
              [Error] paymentController error: ${JSON.stringify(error)}`,
        refId
      );
      throw error;
    }
  }
}