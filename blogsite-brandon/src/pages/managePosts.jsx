import './managePosts.css'

import SideNav from "../components/sideNav"
import PostsList from '../components/postsList'

import Button from "../components/Button"
import http from "../helpers/axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function managePosts(){
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const [posts, setPosts] = useState([])
    async function fetchPosts() {
        try {
            const response = await http({
                method: 'GET',
                url: '/posts',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const postsData = response.data
            setPosts(postsData)

        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = () => {
        try {
            navigate('./create')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchPosts()    
    },[])

    return(
        <>
        <div className="body-post">
            <div className="container-posts">
                <div className='sidenav-container'>
                    <SideNav className='sidenav-styling'/>
                </div>
                <div className="main-content-posts">
                    <div className='posts-header-container'>
                        <h3 className="posts-title">All Posts</h3>
                        <Button onClick={handleCreate} title="➕ Add Posts" variant='outline-success'/>
                    </div>
                    
                    <table class="table table-light table-hover table-posts">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Content</th>
                                <th scope="col">Image url</th>
                                <th scope="col">Owner</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post)=> (
                                <PostsList key={post.id} posts={post} fetchPosts={fetchPosts}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default managePosts