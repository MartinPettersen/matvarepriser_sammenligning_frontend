import { NextResponse } from "next/server";

export async function POST(req: any) {

    console.log("got a request")
    const checkUserFavourite = async (id: string, product_id: string) => {
        const url = "http://127.0.0.1:5000/api/checkuserfavourites";

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
                //console.log(response)
                const res = await response.json()
                console.log(res)
                
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

        console.log("arrived")
        if (!id || !product_id) {
            return NextResponse.json({ message: "Need both user id and product id" }, { status: 400 });
        }

        const result = await checkUserFavourite(id, product_id);
        console.log(result)
        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error", error }, { status: 500 });
    }
}