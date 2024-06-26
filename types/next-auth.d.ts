import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      role: string;
      username: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    username: string;
    score: number;
  }
}
