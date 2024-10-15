import dbconnect from "@/lib/db/connect";
import UserModel, { User } from "@/lib/db/model/user.model";
import NextAuth, { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import LinkedInProvider from "next-auth/providers/linkedin";


export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "tweet.read tweet.write users.read offline.access",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      // Custom logic to save extra details like the Google or Twitter profile to DB
      if (account && account.provider === 'google') {
        try {
          await dbconnect(); // Ensure you connect to your database
    
          // Check if user already exists by userId
          const existingUser = await UserModel.findOne({ userId: user.id });
          const cookieStore = cookies();
          await cookieStore.set('mygoogleid', user.id, { 
            maxAge: 60 * 60 * 24 * 7,  // 1 week expiry
          });
          // If the user does not exist, create a new user
          if (!existingUser) {
            const newUser = new UserModel({
              name: user.name as string,
              email: user.email as string,
              profileimageurl: user.image as string,
              userId: user.id as string,
              credits: 3,            // Assign initial credits
              twitterlogin: false,   // Initial value for Twitter login
              mediumlogin: false,    // Initial value for Medium login
              linkedinlogin: false,  // Initial value for LinkedIn login
            });
    
            await newUser.save(); // Save new user to the database
            console.log('New user created:', newUser);
          } else {
            console.log('User already exists:', existingUser);
          }
          
          return true;  // Proceed with the login
        } catch (error) {
          console.error('Error during signIn:', error);
          return false;  // Block the login in case of an error
        }
      }
    
      return true;  // If not Google provider, allow the login to proceed
    },
    
    async jwt({ token, account,user }) {
      if (account?.provider === 'twitter') {
        token.accessToken = account.access_token;
        token.user=user.id
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.userid=token.user as string
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }