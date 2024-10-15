'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export function AuthButtons() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("twitter")}>Sign in with Twitter</button>
      <br/>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </>
  )
}