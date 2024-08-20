import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

const page = () => {
    auth().protect()
    return (
        <div>profile
            <UserButton/>
        </div>
    )
}

export default page