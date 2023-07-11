import { Schema } from "mongoose";

export const JobSchema = new Schema({
  title: { type: String, required: true, maxlength: 50 },
  salary: { type: Number, required: true, max: 2000000 },
  jobType: { type: String, required: true, maxlength: 20 },
  shift: { type: String, required: true, maxlength: 30 },
  location: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 1000 },
  creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })