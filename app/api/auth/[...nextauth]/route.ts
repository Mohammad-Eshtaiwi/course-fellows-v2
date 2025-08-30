import NextAuth from "next-auth";
import { authOptions } from "./auth"; // move options here

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
