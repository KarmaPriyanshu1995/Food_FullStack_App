import React from 'react'
import { DBLeftSection, DBRightSection } from '../components'

export default function Dashboard() {
  return (
    <div className='w-screen h-screen flex items-center bg-primary'>
        <DBLeftSection/>
        <DBRightSection/>
    </div>
  )
}
