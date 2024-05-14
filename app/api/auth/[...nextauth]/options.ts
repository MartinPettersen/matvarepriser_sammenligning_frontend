import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/app/(models)/User";
import bcrypt from 'bcrypt';
export const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google", profile);

                let userRole = "Google User";
                if (profile?.email == process.env.ADMIN_EMAIL!) {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "text",
                    placeholder: "epost"
                },
                password: {
                    label: "password:",
                    type: "password",
                    placeholder: "passord"
                },
            },
            async authorize(credentials) {
                try {

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
                            console.log("it worked");
                            const theResponse = await response.json() 
                            console.log(theResponse)
                            return theResponse
                          } else {
                            console.log(response);
                          }
                        } catch (error) {
                          console.log(error);
                        }    
                    }

                    // const foundUser: any = await User.findOne({ email: credentials!.email }).lean().exec()
                    console.log("about to start")
                    const foundUser:any = await FetchUser(credentials!.email)
                    console.log("our found user")
                    console.log(foundUser)
                    if (foundUser) {
                        const match = await bcrypt.compare(credentials!.password, foundUser.message.password);

                        if (match) {
                           // delete foundUser.password;

                            // foundUser["role"] = "uverifisert email";

                            return foundUser;
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                return null;
            }
        }),
    ],
    /*
    pages: {
        signIn:"/signIn"
    ,
    }*/
    
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
}