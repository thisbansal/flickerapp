import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../../../env/server.mjs";

export default NextAuth({
  // Configure one or more authentication providers
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
