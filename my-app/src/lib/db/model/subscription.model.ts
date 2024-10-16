import mongoose, { Schema, Document} from "mongoose";

export interface Subscription extends Document {
  userId: string,
  subscription: boolean,
  subscriptiontype: string,
  subscriptiondate: Date,
}

const SubscriptionSchema: Schema<Subscription> = new Schema(
    {
    userId: { type: String, required: true },
    subscription: { type: Boolean, required: false },
    subscriptiontype: { type: String, required: false },
    subscriptiondate: { type: Date, required: false },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const SubscriptionModel =
  (mongoose.models.Subscription as mongoose.Model<Subscription>) ||
  mongoose.model<Subscription>("Subscription", SubscriptionSchema);

export default SubscriptionModel;