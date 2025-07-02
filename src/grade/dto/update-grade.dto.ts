import { IsNumber, Min, Max } from '@nestjs/class-validator';

export class UpdateGradeDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    value: number;
}