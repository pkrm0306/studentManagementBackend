import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Enrollment')
@ApiBearerAuth('JWT-auth')
@Controller('enrollment')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Enroll a student into a course' })
  @ApiBody({ type: CreateEnrollmentDto })
  @ApiResponse({
    status: 201,
    description: 'Student successfully enrolled in course',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student or course not found' })
  @ApiResponse({ status: 409, description: 'Student is already enrolled in this course' })
  async enroll(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    const enrollment = await this.enrollmentService.enroll(createEnrollmentDto);
    return {
      message: 'Student enrolled successfully',
      data: enrollment,
    };
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all courses for a student' })
  @ApiParam({ name: 'studentId', description: 'Student ID (MongoDB ObjectId)' })
  @ApiResponse({
    status: 200,
    description: 'List of courses for the student',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getStudentCourses(@Param('studentId') studentId: string) {
    const enrollments = await this.enrollmentService.getStudentCourses(
      studentId,
    );
    return {
      message: 'Student courses retrieved successfully',
      data: enrollments,
    };
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all students enrolled in a course' })
  @ApiParam({ name: 'courseId', description: 'Course ID (MongoDB ObjectId)' })
  @ApiResponse({
    status: 200,
    description: 'List of students enrolled in the course',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseStudents(@Param('courseId') courseId: string) {
    const enrollments = await this.enrollmentService.getCourseStudents(
      courseId,
    );
    return {
      message: 'Course students retrieved successfully',
      data: enrollments,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove enrollment by ID' })
  @ApiParam({ name: 'id', description: 'Enrollment ID (MongoDB ObjectId)' })
  @ApiResponse({
    status: 200,
    description: 'Enrollment successfully removed',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  async removeEnrollment(@Param('id') id: string) {
    await this.enrollmentService.removeEnrollment(id);
    return {
      message: 'Enrollment removed successfully',
    };
  }

  @Delete('student/:studentId/course/:courseId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove enrollment by student and course IDs' })
  @ApiParam({ name: 'studentId', description: 'Student ID (MongoDB ObjectId)' })
  @ApiParam({ name: 'courseId', description: 'Course ID (MongoDB ObjectId)' })
  @ApiResponse({
    status: 200,
    description: 'Enrollment successfully removed',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  async removeEnrollmentByStudentAndCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    await this.enrollmentService.removeEnrollmentByStudentAndCourse(
      studentId,
      courseId,
    );
    return {
      message: 'Enrollment removed successfully',
    };
  }
}
