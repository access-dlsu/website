import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          hd: "dlsu.edu.ph"
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/", // Redirect errors to home page
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow DLSU email addresses
      const isAllowed = user.email?.endsWith("@dlsu.edu.ph") || false;
      
      if (!isAllowed) {
        console.log(`Sign-in blocked: ${user.email} is not a DLSU email`);
      } else {
        console.log(`Sign-in allowed: ${user.email}`);
      }
      
      return isAllowed;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = nextUrl.pathname.startsWith("/members");
      
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }
      
      return true;
    },
  },
  trustHost: true,
});

