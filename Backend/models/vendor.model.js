import mongoose from 'mongoose';

const { Schema } = mongoose;

const vendorSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    contactNumber: { type: String, trim: true },
    businessName: { type: String, required: true, trim: true },
    businessAddress: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        country: { type: String, trim: true },
    },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    rating: { type: Number, default: 0 },
    reviews: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            reviewText: { type: String },
            rating: { type: Number },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    role: { type: String, default: 'vendor', enum: ['vendor'] },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

vendorSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
