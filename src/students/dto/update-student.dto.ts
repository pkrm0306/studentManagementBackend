import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: 'Student full name',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Student email address (must be unique)',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Student age (between 5 and 100)',
    example: 20,
    minimum: 5,
    maximum: 100,
  })
  @IsInt()
  @Min(5)
  @Max(100)
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({
    description: 'Student class/grade',
    example: 'Grade 10',
  })
  @IsString()
  @IsOptional()
  class?: string;

  @ApiPropertyOptional({
    description: 'Student phone number',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Student address',
    example: '123 Main Street, City, State 12345',
  })
  @IsString()
  @IsOptional()
  address?: string;
}
