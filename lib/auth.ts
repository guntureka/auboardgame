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
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
      }

      return { ...session, ...token };
    },
    async jwt({ token, user }) {
      const users = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!users) {
        token.id = user!.id;
        return token;
      }
      return {
        ...token,
        id: users.id,
        role: users.role,
        username: users.username,
      };
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`; //`${baseUrl}${url}
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default authOptions;
