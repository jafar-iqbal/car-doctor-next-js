import { connectDB } from "@/lib/connect.DB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Invalid credentials");
        }

        const db = await connectDB();
        const currentUser = await db.collection("users1").findOne({ email: email.toLowerCase() });
        if (!currentUser) {
          throw new Error("No user found with the given email");
        }

        const passMatched = await bcrypt.compare(password, currentUser.password);
        if (!passMatched) {
          throw new Error("Incorrect password");
        }

        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github" || account.provider === "facebook") {
        const {email,} = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const userExist = await userCollection.findOne({ email });
          if (!userExist) {
            const res = await userCollection.insertOne(user);
            return user;
          } else {
            return user;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return user;
      }
    },
  },
  pages: {
    signIn: "/login",
  },

});

export { handler as GET, handler as POST };
