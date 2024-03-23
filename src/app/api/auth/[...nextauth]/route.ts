import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import User from "@/app/models/user.model";
import connectDB from "@/app/utils/connestDB";

export const authOptions = {

providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials:any, res:any) {
        await connectDB();

        try{
            const user = await User.findOne({email: credentials.email})
            if (user) {
                const passCorr = await bcrypt.compare(
                  credentials.password,
                  user.password
                );
                if (passCorr) {
                  return user;
                }
              }
        } catch(error) {
            res.status(404).json({message: "Error login", error})
        }
  
      }
    })
  ],
  callbacks: {
    jwt({ token, user }: { token: any; user: any }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }:{session:any; token: any}) {
      session.user.role = token.role
      return session
    }
  }

}
const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST};