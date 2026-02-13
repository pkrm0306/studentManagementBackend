import { IsString, IsInt, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Course name',
    example: 'Mathematics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Course description',
    example: 'Advanced Mathematics Course covering algebra, calculus, and statistics',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Course duration in months',
    example: 6,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  durationMonths: number;
}
