import { IsString, IsInt, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiPropertyOptional({
    description: 'Course name',
    example: 'Mathematics',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Course description',
    example: 'Advanced Mathematics Course covering algebra, calculus, and statistics',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Course duration in months',
    example: 6,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  durationMonths?: number;
}
