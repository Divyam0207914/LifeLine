// migrateUserRoles.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_db_name';

async function migrateUserRoles() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Find all users who have role as a string instead of roles array
    const users = await User.find({ roles: { $exists: false }, role: { $exists: true } });

    console.log(`Found ${users.length} users to migrate`);

    for (const user of users) {
      let newRoles = [];

      if (user.role === 'donor') {
        newRoles = ['donor'];
      } else if (user.role === 'requester') {
        newRoles = ['requester'];
      } else if (user.role === 'admin') {
        newRoles = ['admin'];
      } else {
        newRoles = ['requester']; // default fallback
      }

      user.roles = newRoles;
      user.role = undefined;  // Remove old role field if exists

      await user.save();
      console.log(`Migrated user ${user.email} to roles: ${newRoles}`);
    }

    console.log('Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateUserRoles();
