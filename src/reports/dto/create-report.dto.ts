import {
  Max,
  Min,
  IsNumber,
  IsNotEmpty,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(2000000)
  price!: number;

  @IsNotEmpty()
  make!: string;

  @IsNotEmpty()
  model!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(new Date().getFullYear() - 100)
  @Max(new Date().getFullYear())
  year!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  lng!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  lat!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage!: number;
}
