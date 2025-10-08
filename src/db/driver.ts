import mongoose from "mongoose";


let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI!, {
            bufferCommands: true,
            timeoutMS: 12000,
        }).then((mongoose) => {
            console.log("✅ MongoDB connected");
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}