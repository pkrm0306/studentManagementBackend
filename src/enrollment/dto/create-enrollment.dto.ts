import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'Student ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: 'Course ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  courseId: string;
}
