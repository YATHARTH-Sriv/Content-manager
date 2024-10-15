"use client"
import { signIn, useSession } from 'next-auth/react';

import React from 'react'

function page() {
    const { data: session } = useSession();

    const connectTwitter = () => {
      signIn('twitter', { callbackUrl: '/' });
    };

  
    return (
      <>
        {session ? (
          <button onClick={connectTwitter}>Connect Twitter</button>
        ) : (
          <p>Please login first.</p>
        )}
      </>
    );
  
}


export default page

