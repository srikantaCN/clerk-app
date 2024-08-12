import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    const user = await clerkClient.users.createUser({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
