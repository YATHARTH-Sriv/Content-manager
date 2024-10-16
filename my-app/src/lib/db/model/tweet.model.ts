import mongoose, { Schema, Document} from "mongoose";

export interface Tweet extends Document {
  title: string,
  posteddate: Date,
  category: string,
  content: string, 
  // posted: boolean,
  userId: string,
}

const TweetSchema: Schema<Tweet> = new Schema(
    {
    title: { type: String, required: true },
    posteddate: { type: Date, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    // posted: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const TweetModel =
  (mongoose.models.Tweet as mongoose.Model<Tweet>) ||
  mongoose.model<Tweet>("Tweet", TweetSchema);

export default TweetModel;