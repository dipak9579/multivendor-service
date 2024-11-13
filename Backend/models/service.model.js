import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,  // Add this field for subcategory
  },
  pricing: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  location: {
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  availability: {
    from: Date,
    to: Date,
  },
  images: [
    {
      url: String,
      altText: String,
    },
  ],
}, {
  timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
