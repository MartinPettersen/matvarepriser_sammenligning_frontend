import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/app/(models)/User";
import bcrypt from 'bcrypt';
export const options = {
    providers: [
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
                            const theResponse = await response.json() 
                            return theResponse
                          } else {
                            console.log(response);
                          }
                        } catch (error) {
                          console.log(error);
                        }    
                    }

                    // const foundUser: any = await User.findOne({ email: credentials!.email }).lean().exec()
                    const foundUser:any = await FetchUser(credentials!.email)
                    if (foundUser) {

                        const match = await bcrypt.compare(credentials!.password, foundUser.user.password);
                        if (match) {
                            delete foundUser.password;
                            foundUser["role"] = foundUser.user.id;
                            foundUser["name"] = foundUser.user.name;
                            foundUser["id"] = foundUser.user.id;
                            foundUser["email"] = foundUser.user.email;
                            


                            /*
                            const temp = {
                                user: {
                                  name: foundUser.message.name,
                                  email: foundUser.message.email,
                                  image: undefined,
                                  role: 'uverifisert email'
                                }
                              }
                              */
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