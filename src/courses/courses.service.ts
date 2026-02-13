import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const course = await this.courseModel.create(createCourseDto);
    return course;
  }

  async findAll(): Promise<CourseDocument[]> {
    return await this.courseModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<CourseDocument> {
    const course = await this.courseModel
      .findById(id)
      .populate({
        path: 'enrollments',
        populate: { path: 'studentId', model: 'Student' },
      })
      .exec();

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDocument> {
    const course = await this.courseModel.findById(id).exec();

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    Object.assign(course, updateCourseDto);
    return await course.save();
  }

  async remove(id: string): Promise<void> {
    const course = await this.courseModel.findById(id).exec();

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    await this.courseModel.findByIdAndDelete(id).exec();
  }
}
