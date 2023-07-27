import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Please enter your username and password");
        }
        const user = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        const isValid = await bcrypt.compare(credentials?.password, user?.password!);

        if (user && isValid) {
          return user;
        }
        throw new Error("Invalid username or password");
      },
    }),
  ],
};

export default authOptions;
