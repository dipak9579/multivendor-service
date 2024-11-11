import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service', 
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  scheduledDate: {
    type: Date,
    required: true, 
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
  payment: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    transactionId: { type: String, unique: true, sparse: true },
  },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  
  // New fields
  notes: {
    type: String,
    maxlength: 500, // Optional notes or special requests
  },
  duration: {
    type: Number, // Duration in minutes
  },
  discount: {
    discountAmount: { type: Number, default: 0 },
    discountCode: { type: String },
  },
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  cancellationReason: {
    type: String,
    maxlength: 500, // Reason for cancellation
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor', // Or 'Staff' if you have a staff model
  },
  completionDate: {
    type: Date,
  },
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
bookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
