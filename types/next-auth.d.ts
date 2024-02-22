import NextAuth from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    expires_in: number;
    user: Session.user;
  }
  interface Session {
    user: {
      id: string;
      aud: string;
      role: string;
      email: string;
      email_confirmed_at: string;
      confirmed_at: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
    };
    expires_in: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    expires_in: number;
    user: Session.user;
  }
}
