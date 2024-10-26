import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service model
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor', // Reference to the Vendor who offers the service
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  scheduledDate: {
    type: Date,
    required: true, // Date when the service is scheduled
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
  payment: {
    amount: { type: Number, required: true }, // Total cost for the service
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    transactionId: { type: String, unique: true, sparse: true }, // Optional transaction ID from the payment gateway
  },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` timestamp on document modification
bookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
