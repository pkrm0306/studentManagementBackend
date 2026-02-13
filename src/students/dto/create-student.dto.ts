import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student full name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Student email address (must be unique)',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Student age (between 5 and 100)',
    example: 20,
    minimum: 5,
    maximum: 100,
  })
  @IsInt()
  @Min(5)
  @Max(100)
  age: number;

  @ApiProperty({
    description: 'Student class/grade',
    example: 'Grade 10',
  })
  @IsString()
  @IsNotEmpty()
  class: string;

  @ApiProperty({
    description: 'Student phone number',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Student address',
    example: '123 Main Street, City, State 12345',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
