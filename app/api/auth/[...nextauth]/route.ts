import { prismaClient } from "@/lib/db";
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
// Extending the Session interface
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  // Extending the User interface
  interface User extends DefaultUser {
    id: string;
  }
}

// Extending the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }
      try {
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          const newUser = await prismaClient.user.create({
            data: {
              email: user.email,
              provider: "GOOGLE",
              username: user.email,
              password: "",
            },
          });
          user.id = newUser.id;
        } else {
          user.id = existingUser.id;
        }
      } catch (error) {
        console.error("error during sign in :", error);
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.sub ?? "";
      }
      return token;
    },
    // Modified session callback
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
