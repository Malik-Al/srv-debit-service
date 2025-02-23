import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { MaxDecimalPlaces } from "src/validators/max.decimal.places";

export class PaymentDto {
    @IsNumber()
    readonly user_id: number;

    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: "Amount must be a number" })
    @MaxDecimalPlaces(2, { message: "Amount must be an integer or have up to two decimal places" })
    readonly amount: number;
}


