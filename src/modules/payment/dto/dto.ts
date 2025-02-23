import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { MaxDecimalPlaces } from "src/validators/max.decimal.places";

export class PaymentDto {
    @IsNumber()
    @IsNotEmpty({message: 'The user_id field cannot be empty'})
    readonly user_id: number;

    @IsNotEmpty({message: 'The amount field cannot be empty'})
    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: "Amount must be a number" })
    @MaxDecimalPlaces(2, { message: "Amount must be an integer or have up to two decimal places" })
    readonly amount: number;
};


