import { NextResponse } from "next/server";

export async function POST(req: any) {

    const checkUserFavourite = async (id: string, product_id: string) => {
        const url = "http://127.0.0.1:5000/api/checkuserfavourites";

        const data = { id, product_id };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const res = await response.json()
                
                return res

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

        const result = await checkUserFavourite(id, product_id);
        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "error", error }, { status: 500 });
    }
}