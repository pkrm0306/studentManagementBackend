import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentDocument> {
    // Check if email already exists
    const existingStudent = await this.studentModel.findOne({
      email: createStudentDto.email,
    });

    if (existingStudent) {
      throw new ConflictException('Student with this email already exists');
    }

    const student = await this.studentModel.create(createStudentDto);
    return student;
  }

  async findAll(): Promise<StudentDocument[]> {
    return await this.studentModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<StudentDocument> {
    const student = await this.studentModel
      .findById(id)
      .populate({
        path: 'enrollments',
        populate: { path: 'courseId', model: 'Course' },
      })
      .exec();

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentDocument> {
    const student = await this.studentModel.findById(id).exec();

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    // Check if email is being updated and if it already exists
    if (updateStudentDto.email && updateStudentDto.email !== student.email) {
      const existingStudent = await this.studentModel.findOne({
        email: updateStudentDto.email,
      });

      if (existingStudent) {
        throw new ConflictException('Student with this email already exists');
      }
    }

    Object.assign(student, updateStudentDto);
    return await student.save();
  }

  async remove(id: string): Promise<void> {
    const student = await this.studentModel.findById(id).exec();

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    await this.studentModel.findByIdAndDelete(id).exec();
  }
}
