import { connectDB } from "@/lib/connect.DB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { ObjectId } from "mongodb";

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
        const currentUser = await db
          .collection("users1")
          .findOne({ email: email });
        if (!currentUser) {
          throw new Error("No user found with the given email");
        }

        const passMatched = bcrypt.compareSync(password, currentUser.password);
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
    async jwt({ token, user, account }) {
      const db = await connectDB();

      if (user) {
        const existingUser = await db
          .collection("users1")
          .findOne({ email: user.email });
        if (!existingUser) {
          const newUser = {
            email: user.email,
            name: user.name || "",
            image: user.image || "",
          };
          const result = await db.collection("users1").insertOne(newUser);
          token.id = result.insertedId;
        } else {
          token.id = existingUser._id;
        }
        token.email = user.email;
      } else {
        const dbUser = await db
          .collection("users1")
          .findOne({ _id: new ObjectId(token.id) });
        if (dbUser) {
          token.email = dbUser.email;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
