import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: Number })
  durationMonths: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
