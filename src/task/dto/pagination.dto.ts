import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // converts query parameter string to number here
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type( () => Number ) // converts query parameter string to number here
    offset?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    initDate?: string;

    @IsOptional()
    @IsString()
    endDate?: string;

}
