import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/login');
}