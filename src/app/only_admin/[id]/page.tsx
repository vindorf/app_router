"use client"
import Container from '@/app/components/Container'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const PostByUserIdPage = ({params}:{params: {id: string}}) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const { data } = await axios.get(`/api/search_post?id=${params.id}`);
        setPosts(data);
    }
    useEffect(() => {
        fetchPosts();
    },[]);
  return (
    <div>
        <Container className='w-64' label='Info'>
            <p>PostByUserIdPage</p>
            <p>ID: {params.id} </p>
            <Link href='/only_admin'>Back</Link>
        </Container>
        {posts && posts.map((e:any, i:any) => 
    <Container label='Post'>
        <p>{e.title} </p>
    </Container>    
    )}
    </div>
  )
}

export default PostByUserIdPage