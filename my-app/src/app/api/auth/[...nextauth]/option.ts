
import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import dbconnect from "@/lib/db/connect";
import UserModel from "@/lib/db/model/user.model";
import { cookies } from "next/headers";

// export const runtime = 'edge'
export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
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
    async jwt({ token, account,user }) {
      if (account?.provider === 'twitter') {
        token.accessToken = account.access_token;
        token.user=user.id
        const cookie=cookies()
        cookie.set('mytwitterid', user.id, { 
          maxAge: 60 * 60 * 24 * 7,  // 1 week expiry
        });
        
      }
      if(account?.provider==='google'){ 
        console.log('google user',user)
        token.googleemail=user.email
        token.googleid=user.id
        token.googleimage=user.image as string
        token.googlename=user.name 
        const cookieStore =  cookies();
        console.log("cookie value set up",token.googleid)
        const settingcookie=await cookieStore.set('mygoogleid', token.googleid, { 
           maxAge: 60 * 60 * 24 * 7,  // 1 week expiry
        });

      }
      return token
    },
    async session({ session, token }) {
      if(token.googleid){
        session.googleid=token.googleid
        session.googleemail=token.googleemail as string
        session.googleimage=token.googleimage as string
        session.googlename=token.googlename as string
        const addedtokenuser=await addinguser(session)
        console.log('addedtokenuser',addedtokenuser)
      }
      session.accessToken = token.accessToken;
      session.userid=token.user as string
      // console.log('session: ',session)
      return session;
    },
  },
};

interface Sessiondata {
  googleid:string
  googleemail:string
  googleimage:string
  googlename:string
}

async function addinguser(session:Sessiondata){
              try {
                await dbconnect(); // Ensure you connect to your database
          
                // Check if user already exists by userId
                const existingUser = await UserModel.findOne({ userId: session.googleid });
                // const cookieStore =  cookies();
                // // console.log('cookieStore',cookieStore.)
                // console.log("cookie value set up",session.googleid)
                // const settingcookie=await cookieStore.set('mygoogleid', session.googleid, { 
                //   maxAge: 60 * 60 * 24 * 7,  // 1 week expiry
                // });

                // console.log('settingcookie',settingcookie)
                // If the user does not exist, create a new user
                if (!existingUser) {
                  const newUser = new UserModel({
                    name: session.googlename as string,
                    email: session.googleemail as string,
                    profileimageurl: session.googleimage as string,
                    userId: session.googleid as string,
                    credits: 3,            // Assign initial credits
                    twitterlogin: false,   // Initial value for Twitter login
                    mediumlogin: false,    // Initial value for Medium login
                    linkedinlogin: false,  // Initial value for LinkedIn login
                  });
          
                  await newUser.save(); // Save new user to the database
                  // console.log('New user created:', newUser);
                } else {
                  // console.log('User already exists:', existingUser);
                }
                
                return true;  // Proceed with the login
              } catch (error) {
                console.error('Error during signIn:', error);
                return false;  // Block the login in case of an error
              }
}
