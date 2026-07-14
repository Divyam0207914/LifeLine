import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  location: { type: String, required: true },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  availability: { type: Boolean, default: true },
  contact: { type: String, required: true },
  lastDonated: { type: Date, default: null },
  totalDonations: { type: Number, default: 0 },
  nextEligibleDate: { type: Date, default: null },
}, { timestamps: true });

donorSchema.index({ coordinates: '2dsphere' });

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;
