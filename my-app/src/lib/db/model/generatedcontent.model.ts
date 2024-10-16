import mongoose, { Schema, Document} from "mongoose";

export interface Generatedcontent extends Document {
  userId: string,
  title: string,
  category: string,
  platform: string,
  content: string,
}

const GeneratedSchema: Schema<Generatedcontent> = new Schema(
    {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    platform: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const GeneratedModel =
  (mongoose.models.Generatedcontent as mongoose.Model<Generatedcontent>) ||
  mongoose.model<Generatedcontent>("Generatedcontent", GeneratedSchema);

export default GeneratedModel;