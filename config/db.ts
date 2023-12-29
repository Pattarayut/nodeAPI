
import mongoose from "mongoose";


const connectDB = async () :Promise<void> => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb')
    console.log(' ===== DB Connected =====');
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;

