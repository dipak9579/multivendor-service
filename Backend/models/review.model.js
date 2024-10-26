import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service being reviewed
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who provided the review
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor', // Reference to the Vendor offering the service
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating between 1 and 5
  },
  reviewText: {
    type: String,
    trim: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now, // Date the review was created
  },
  vendorResponse: {
    responseText: { type: String, trim: true },
    responseDate: { type: Date },
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
