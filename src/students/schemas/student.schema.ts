import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
