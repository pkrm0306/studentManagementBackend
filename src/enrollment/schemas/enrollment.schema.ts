import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  enrollmentDate: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

// Create compound index to prevent duplicate enrollments
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
