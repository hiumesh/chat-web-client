import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// reference https://github.com/nextauthjs/next-auth/discussions/6347

async function refreshAccessToken(token: JWT) {
  try {
    const url = process.env.NEXTAUTH_URL + "/token?grant_type=refresh_token";

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    delete token.error;

    return token;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          process.env.NEXTAUTH_URL + "/token?grant_type=password",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();

        if (res.ok && data) {
          return data;
        }

        throw new Error(data["error_description"] || "API error");
      },
    }),
  ],
  useSecureCookies: false,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log("inside", user, account, token);
        return {
          ...token,
          ...user,
        };
      }

      if (Date.now() / 1000 < token.expires_in) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.expires_in = token.expires_in;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
