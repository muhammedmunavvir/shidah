import mongoose, { Schema } from "mongoose";
import { Iuser } from "../types/user.type.js";


const userscheama=new Schema<Iuser>({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
)

const Usermodel=mongoose.model<Iuser>("user",userscheama)
export default Usermodel;