import mongoose, { Schema } from "mongoose";

const postsSchema = new Schema({
  name: { type: String },
  imageUrl: { type: String },
});

export default mongoose.models.Posts || mongoose.model('Posts', postsSchema);