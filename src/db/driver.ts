import mongoose from "mongoose";

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI!, {
            bufferCommands: false,
        }).then((mongoose) => {
            console.log("✅ MongoDB connected");
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}