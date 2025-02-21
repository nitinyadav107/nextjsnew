import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: "work_manager" });

    console.log("Connected to database");
    console.log(conn.connection.host);
  } 
  catch (error) {
    console.error("Error connecting to database", error);
  }
};
export default connectDb;
