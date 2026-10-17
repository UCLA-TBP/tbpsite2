const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: `${__dirname}/../.env` });
const User = require("../schemas/UserSchema");

const uri = process.env.MONGO_URI;

async function migrate() {
    try {
        // connect to mongo
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // find users with numbered fields
        const usersWithOldFields = await User.find({
            $or: [
                { "requirements.academicOutreach1": { $exists: true } },
                { "requirements.academicOutreach2": { $exists: true } },
            ],
        });

        console.log(
            `Found ${usersWithOldFields.length} users with 'academicOutreach1' or 'academicOutreach2'`
        );

        // find users with old academicOutreach label true, but the rename wouldn't work
        const conflictResult = await User.updateMany(
            {
                "requirements.academicOutreach1": false,
                "requirements.academicOutreach": { $exists: true },
            },
            { $unset: { "requirements.academicOutreach1": "" } },
            { strict: false }
        );

        console.log(
            `Removed unchecked 'academicOutreach1' where 'academicOutreach' was already set for ${conflictResult.modifiedCount} users`
        );

        // remove AO2 and rename AO1 -> AO
        const result = await User.updateMany(
            {
                $or: [
                    { "requirements.academicOutreach1": { $exists: true } },
                    { "requirements.academicOutreach2": { $exists: true } },
                ],
            },
            {
                $rename: {
                    "requirements.academicOutreach1":
                        "requirements.academicOutreach",
                },
                $unset: { "requirements.academicOutreach2": "" },
            },
            { strict: false }
        );

        console.log(
            `Migration complete! Updated ${result.modifiedCount} users`
        );
        console.log(`Matched ${result.matchedCount} users`);

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
