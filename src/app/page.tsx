import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {

  return (
    <div>page
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default page