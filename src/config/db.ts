import mongoose from 'mongoose';

const connectionURI: string = process.env.DB_URI || 'mongodb://localhost:27017/adnan_homemade_cake_backend';

const connectDB = async (): Promise<void> => {
  await mongoose.connect(connectionURI);
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
};

export { connectDB };
