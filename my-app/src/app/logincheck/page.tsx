import { signIn } from 'next-auth/react'
import React from 'react'

function page() {
  return (
    <div>
        <button onClick={()=>signIn("google")}>google signin</button>
    </div>
  )
}

export default page