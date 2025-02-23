import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class QueryDto {
    @ApiProperty({example: 'page', required: false})  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly page: number;

    @ApiProperty({example: 'size', required: false})  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly size: number;
};



export class ResponseHistoryDto {
    @ApiProperty({example: '200', description: 'Статус http'})  
    public code: number

    @ApiProperty({example: 'true', description: 'Прогресс'}) 
    public success: boolean

    @ApiProperty({example: 'Успешно', description: 'Сообщение'}) 
    public message: string

    @ApiProperty({example: [
        {
            "payment_id": 11,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T16:15:22.688Z"
        },
        {
            "payment_id": 10,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T16:12:55.384Z"
        },
        {
            "payment_id": 9,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T15:55:21.211Z"
        },
        {
            "payment_id": 8,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T08:48:58.201Z"
        },
        {
            "payment_id": 7,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T08:29:02.992Z"
        },
        {
            "payment_id": 6,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T08:27:35.185Z"
        },
        {
            "payment_id": 5,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T08:24:34.688Z"
        },
        {
            "payment_id": 4,
            "user_id": 1,
            "action": "DEBIT",
            "amount": "212.45",
            "created_at": "2025-02-23T08:22:21.971Z"
        },
    ], description: 'Данные'}) 
    public data: Array<any>[]
  }

