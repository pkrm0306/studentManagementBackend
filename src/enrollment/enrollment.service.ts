import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { Course, CourseDocument } from '../courses/schemas/course.schema';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async enroll(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<EnrollmentDocument> {
    const { studentId, courseId } = createEnrollmentDto;

    // Verify student exists
    const student = await this.studentModel.findById(studentId).exec();

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Verify course exists
    const course = await this.courseModel.findById(courseId).exec();

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if enrollment already exists
    const existingEnrollment = await this.enrollmentModel.findOne({
      studentId: new Types.ObjectId(studentId),
      courseId: new Types.ObjectId(courseId),
    });

    if (existingEnrollment) {
      throw new ConflictException(
        'Student is already enrolled in this course',
      );
    }

    // Create enrollment
    const enrollment = await this.enrollmentModel.create({
      studentId: new Types.ObjectId(studentId),
      courseId: new Types.ObjectId(courseId),
      enrollmentDate: new Date(),
    });

    return enrollment;
  }

  async getStudentCourses(studentId: string): Promise<EnrollmentDocument[]> {
    // Verify student exists
    const student = await this.studentModel.findById(studentId).exec();

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return await this.enrollmentModel
      .find({ studentId: new Types.ObjectId(studentId) })
      .populate('courseId')
      .sort({ enrollmentDate: -1 })
      .exec();
  }

  async getCourseStudents(courseId: string): Promise<EnrollmentDocument[]> {
    // Verify course exists
    const course = await this.courseModel.findById(courseId).exec();

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return await this.enrollmentModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .populate('studentId')
      .sort({ enrollmentDate: -1 })
      .exec();
  }

  async removeEnrollment(id: string): Promise<void> {
    const enrollment = await this.enrollmentModel.findById(id).exec();

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    await this.enrollmentModel.findByIdAndDelete(id).exec();
  }

  async removeEnrollmentByStudentAndCourse(
    studentId: string,
    courseId: string,
  ): Promise<void> {
    const enrollment = await this.enrollmentModel
      .findOne({
        studentId: new Types.ObjectId(studentId),
        courseId: new Types.ObjectId(courseId),
      })
      .exec();

    if (!enrollment) {
      throw new NotFoundException(
        'Enrollment not found for this student and course',
      );
    }

    await this.enrollmentModel.findByIdAndDelete(enrollment._id).exec();
  }
}
