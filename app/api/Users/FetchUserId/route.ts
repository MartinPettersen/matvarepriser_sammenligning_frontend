import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req: any) {


    const FetchUser = async (email: string) => {
        const url = "http://127.0.0.1:5000/api/getuserid";

        const data = { email };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.NEXT_PUBLIC_MATVARE_PRISER_KEY!,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return response.json()
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    try {
        const body = await req.json()
        const email = body.email
        if (!email) {
            return NextResponse.json({ message: "User email is required" }, { status: 400 });
        }

        const existingUser = await FetchUser(email)

        return NextResponse.json(existingUser, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error", error }, { status: 500 });
    }
}