import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class QueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly page: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly size: number;
};


