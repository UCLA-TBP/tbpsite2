const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: `${__dirname}/../.env` });
const User = require("../schemas/UserSchema");

const uri = process.env.MONGO_URI;

async function verify() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB\n");

        // Count total users
        const totalUsers = await User.countDocuments();
        console.log(`Total users in database: ${totalUsers}`);

        // Count users WITH academicOutreach2
        const usersWithField = await User.countDocuments({
            "requirements.academicOutreach2": { $exists: true },
        });
        console.log(`Users with academicOutreach2 field: ${usersWithField}`);

        // Count users WITHOUT academicOutreach2
        const usersWithoutField = await User.countDocuments({
            "requirements.academicOutreach2": { $exists: false },
        });
        console.log(`Users WITHOUT academicOutreach2 field: ${usersWithoutField}`);

        // Count users with academicOutreach2 = false
        const usersWithFalse = await User.countDocuments({
            "requirements.academicOutreach2": false,
        });
        console.log(`Users with academicOutreach2 = false: ${usersWithFalse}`);

        // Count users with academicOutreach2 = true
        const usersWithTrue = await User.countDocuments({
            "requirements.academicOutreach2": true,
        });
        console.log(`Users with academicOutreach2 = true: ${usersWithTrue}`);

        // Sample a few users to show their requirements
        console.log("\n--- Sample Users (first 3) ---");
        const sampleUsers = await User.find().limit(3).select(
            "name.first name.last requirements.academicOutreach1 requirements.academicOutreach2"
        );
        sampleUsers.forEach((user) => {
            console.log(
                `${user.name.first} ${user.name.last}:`
            );
            console.log(
                `  academicOutreach1: ${user.requirements?.academicOutreach1 ?? "undefined"}`
            );
            console.log(
                `  academicOutreach2: ${user.requirements?.academicOutreach2 ?? "undefined"}`
            );
        });

        // Close connection
        await mongoose.connection.close();
        console.log("\nDatabase connection closed");
        process.exit(0);
    } catch (error) {
        console.error("Verification failed:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

verify();


