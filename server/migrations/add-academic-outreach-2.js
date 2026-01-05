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

        // Find all users that don't have academicOutreach2 set
        const usersToUpdate = await User.find({
            $or: [
                { "requirements.academicOutreach2": { $exists: false } },
                { "requirements.academicOutreach2": null },
            ],
        });

        console.log(`Found ${usersToUpdate.length} users to update`);

        // Update all users to set academicOutreach2 to false
        const result = await User.updateMany(
            {
                $or: [
                    { "requirements.academicOutreach2": { $exists: false } },
                    { "requirements.academicOutreach2": null },
                ],
            },
            {
                $set: { "requirements.academicOutreach2": false },
            }
        );

        console.log(
            `Migration complete! Updated ${result.modifiedCount} users`
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
