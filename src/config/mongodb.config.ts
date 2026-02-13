import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleOptions => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_management_db';
  
  return {
    uri,
    retryWrites: true,
    w: 'majority',
  };
};
