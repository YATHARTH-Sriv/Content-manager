import mongoose, { Schema, Document} from "mongoose";

export interface Tweet extends Document {
  content: string, 
  // scheduleDate: Date,
  posted: boolean,
  userId: string
}

const TweetSchema: Schema<Tweet> = new Schema(
    {
    content: { type: String, required: true },
    // scheduleDate: { type: Date, required: true },
    posted: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const TweetModel =
  (mongoose.models.Tweet as mongoose.Model<Tweet>) ||
  mongoose.model<Tweet>("Tweet", TweetSchema);

export default TweetModel;