import { IsArray, IsNumber, IsString, Min } from "class-validator";

export class CreateTaskDto {

    @IsString()
    name: string;

    @IsString()
    date: string;

    @IsArray()
    persons: PersonDto[];

}

export class PersonDto {

    @IsString()
    fullname: string;

    @IsNumber()
    @Min(18)
    age: number;

    @IsArray()
    abilities: AbilityDto[];

}

export class AbilityDto {

    @IsString()
    ability: string;

}
