import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Students')
@ApiBearerAuth('JWT-auth')
@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({
    status: 201,
    description: 'Student successfully created',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Student with this email already exists' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    return {
      message: 'Student created successfully',
      data: student,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({
    status: 200,
    description: 'List of all students',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    const students = await this.studentsService.findAll();
    return {
      message: 'Students retrieved successfully',
      data: students,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID (MongoDB ObjectId)' })
  @ApiResponse({
    status: 200,
    description: 'Student details',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@Param('id') id: string) {
    const student = await this.studentsService.findOne(id);
    return {
      message: 'Student retrieved successfully',
      data: student,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiParam({ name: 'id', description: 'Student ID (MongoDB ObjectId)' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({
    status: 200,
    description: 'Student successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentsService.update(id, updateStudentDto);
    return {
      message: 'Student updated successfully',
      data: student,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a student' })
  @ApiParam({ name: 'id', description: 'Student ID (MongoDB ObjectId)' })
  @ApiResponse({
    status: 200,
    description: 'Student successfully deleted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(@Param('id') id: string) {
    await this.studentsService.remove(id);
    return {
      message: 'Student deleted successfully',
    };
  }
}
