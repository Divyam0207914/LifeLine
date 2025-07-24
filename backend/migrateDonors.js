// migrateDonors.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Donor from './models/donor.model.js'; // Adjust path if needed

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_db_name';

async function migrateDonors() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Find donors missing totalDonations or nextEligibleDate fields
    const donors = await Donor.find({
      $or: [
        { totalDonations: { $exists: false } },
        { nextEligibleDate: { $exists: false } }
      ]
    });

    console.log(`Found ${donors.length} donors to migrate.`);

    for (const donor of donors) {
      // Set totalDonations to 1 if missing
      if (donor.totalDonations === undefined) {
        donor.totalDonations = 1;
      }

      // Calculate nextEligibleDate if missing and lastDonated is set
      if (!donor.nextEligibleDate && donor.lastDonated) {
        const nextEligible = new Date(donor.lastDonated);
        nextEligible.setDate(nextEligible.getDate() + 90); // 90 days after last donation
        donor.nextEligibleDate = nextEligible;
      }

      await donor.save();
      console.log(`Migrated donor for userId: ${donor.userId}`);
    }

    console.log('Donor migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Donor migration failed:', error);
    process.exit(1);
  }
}

migrateDonors();
