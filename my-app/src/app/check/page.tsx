"use client"
import { signIn, signOut, useSession } from 'next-auth/react';

import React from 'react'

function Page() {
    const { data: session } = useSession();

    const connectTwitter = () => {
      signIn('twitter', { callbackUrl: '/' });
    };
    const disconnectTwitter = () => {
      signOut({ callbackUrl: '/' });
    }
    const connectGoogle = () => {
      signIn('google', { callbackUrl: '/' });
    }

  
    return (
      <>
        {session ? (
          <>
          <p>You are logged in ${session.user.name}</p>
          <button onClick={disconnectTwitter}>Disconnect Twitter</button>
          </>
        ) : (
          <div>
          <button onClick={connectTwitter}>Connect Twitter</button>
          <button onClick={connectGoogle}>Connect Google</button>
          </div>
        )}
      </>
    );
  
}


export default Page

