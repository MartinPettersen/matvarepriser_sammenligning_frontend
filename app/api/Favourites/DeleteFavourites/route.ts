import { NextResponse } from "next/server";

export async function POST(req: any) {

    console.log("got a request")
    const deleteUserFavourite = async (id: string, product_id: string) => {
        const url = "http://127.0.0.1:5000/api/deleteuserfavourites";

        const data = { id, product_id };
        console.log("i get called");
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("it worked");

            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    try {
        const body = await req.json()
        const id = body.id
        const product_id = body.product_id

        if (!id || !product_id) {
            return NextResponse.json({ message: "Need both user id and product id" }, { status: 400 });
        }


        await deleteUserFavourite(id, product_id);
        return NextResponse.json({ message: "User Favourite Deleted" }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error", error }, { status: 500 });
    }
}