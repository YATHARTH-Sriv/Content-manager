"use client"
import { signIn, useSession } from 'next-auth/react';

import React from 'react'

function Page() {
    const { data: session } = useSession();

    const connectTwitter = () => {
      signIn('twitter', { callbackUrl: '/' });
    };

  
    return (
      <>
        {session ? (
          <p>Please login first.</p>
        ) : (
          <button onClick={connectTwitter}>Connect Twitter</button>
        )}
      </>
    );
  
}


export default Page

