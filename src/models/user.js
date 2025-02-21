import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  about: String,
  profileURL: String,
  // address: {
  //   street: String,
  //   city: String,
  //   country: String,
  //   pinCode: String
  // }

}, { timestamps: true });

export const User = mongoose.models.Users || mongoose.model('Users', UserSchema);
