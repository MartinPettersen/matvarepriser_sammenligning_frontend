import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req: any){

    const CreateUser = async (id:string, password: string, email: string, name: string) => {
        const url = "http://127.0.0.1:5000/api/createuser";
        
        const data = {id, password, email, name };
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
    
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      };
    const FetchUser = async (email: string) => {
        const url = "http://127.0.0.1:5000/api/getuser";
        
        const data = {email};
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
        const userData = body.formData

        if(!userData.email || !userData.password) {
            return NextResponse.json({message: "All fields are required"}, {status: 400});            
        }

        const existingUser = FetchUser(userData.email)

        if (await existingUser) {
            return NextResponse.json({message: "User allready exists"}, {status: 409});            

        }

        const hashPassword = await bcrypt.hash(userData.password, 12)
        userData.password = hashPassword

        await CreateUser(userData.id, userData.password, userData.email, userData.name);
        return NextResponse.json({message: "User Created"}, {status: 201});            

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "error", error}, {status: 500});
    }
}