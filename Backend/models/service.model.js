import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor', // Reference to the Vendor model
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Plumbing', 'Electrical', 'Cleaning', 'Moving', 'Painting', 'IT Support', 'Other'],
    // Enum restricts the service categories to predefined options
  },
  pricing: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
  },
  location: {
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    zipCode: { type: String, trim: true },
  },
  availability: {
    from: { type: Date },
    to: { type: Date },
  },
  ratings: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: { type: String },
      altText: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` timestamp
serviceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
