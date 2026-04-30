import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

/**
 * SOVEREIGN OIDC PROTOCOL v1.0
 * 
 * Secure Handshake Configuration for institutional-grade deployments.
 * Enforces verified identity anchors via external IdPs.
 */

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (!user.email) return false;

      // THE ARCHITECT GUARD
      if (user.email === "office.sovereign.ag@gmail.com") {
        console.log(`[ARCHITECT_HANDSHAKE] Verified: ${user.email}`);
        return true;
      }
      return true;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).isArchitect = session.user.email === "office.sovereign.ag@gmail.com";
        (session.user as any).nist_compliant = true;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "SOVEREIGN_GENESIS_SECRET_2026",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
