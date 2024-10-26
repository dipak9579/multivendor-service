import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    contactNumber: { type: String, trim: true },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        country: { type: String, trim: true },
    },
    role: { type: String, default: 'customer', enum: ['customer'] },
    bookingHistory: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
