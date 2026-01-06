const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: `${__dirname}/../.env` });
const User = require("../schemas/UserSchema");

const uri = process.env.MONGO_URI;

async function migrate() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Find all users that have the old academicOutreach field (singular, without number)
        const usersWithOldField = await User.find({
            "requirements.academicOutreach": { $exists: true },
        });

        console.log(
            `Found ${usersWithOldField.length} users with old 'academicOutreach' field`
        );

        // Remove the old academicOutreach field from all users
        const result = await User.updateMany(
            { "requirements.academicOutreach": { $exists: true } },
            { $unset: { "requirements.academicOutreach": "" } }
        );

        console.log(
            `Migration complete! Removed old field from ${result.modifiedCount} users`
        );
        console.log(`Matched ${result.matchedCount} users`);

        // Close connection
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

migrate();
