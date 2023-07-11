import { Schema } from "mongoose";


export const HouseSchema = new Schema({
  address: { type: String, required: true, maxlength: 80 },
  bedrooms: { type: Number, required: true, max: 100, min: 1 },
  bathrooms: { type: Number, required: true, max: 50, min: 1 },
  sqft: { type: Number, required: true, max: 500000, min: 100 },
  price: { type: Number, required: true, max: 10000000 },
  imgUrl: { type: String, required: true, default: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' },
  creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })