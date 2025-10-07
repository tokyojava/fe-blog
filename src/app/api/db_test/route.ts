import { connectToDatabase } from "@/db/driver";
import User from "@/db/users";

export async function GET() {
    try {
        const conn = await connectToDatabase();
        const usersCount = await User.countDocuments();
        return Response.json({ message: `Database test Successful and there are ${usersCount} users in the system` }, { status: 200 });
    } catch (e) {
        return Response.json({ message: 'Database test Failed', error: e }, { status: 500 });
    }
}