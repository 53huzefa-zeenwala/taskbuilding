import React from 'react'
import { Blob, LoginForm } from '../components'

export default function login() {
  return (
    <div className='relative overflow-x-hidden'>
      <Blob size={160} type="light" fromX={-50} fromY={-50} rotate={80} />
      <Blob size={125} type="light" fromX={275} fromY={270} rotate={300} />
      <Blob size={85} type="dark"  fromX={85} fromY={550} rotate={80} />

      <LoginForm />
    </div>
  )
}
