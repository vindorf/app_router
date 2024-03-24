"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Container from '../components/Container'

const AdminPage = () => {
    const router = useRouter();
    const {data: session} = useSession()
    useEffect(() => {
        if(!session) {
            router.replace('/')
        }
    },[session]);
  return (
    <div>
        <Container label='Info'>
        {session?.user?.role !== 'admin'? <div>Access denied for User</div> : <div>Welcom Admin</div>}
        </Container>
         
    </div>
  )
}

export default AdminPage