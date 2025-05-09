import './createPosts.css'

import SideNav from "../components/sideNav"
import FormPosts from '../components/formPosts'

import Button from "../components/Button"
import http from "../helpers/axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

function createPosts(){
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const [posts, setPosts] = useState()
    
    const handleCreate = async (body) => {
        try {
            const response = await http({
                method: 'POST',
                url: '/posts',
                data: body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const postsData = response.data
            setPosts(postsData)
            navigate('/posts')
        } catch (error) {
            console.log(error, '<<<ini errornya')

            let message = 'Something went wrong'
            if(error.response){
                message = error.response.data.message
            }
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error'
            })
        }
    }

    const handleBack = () =>{
        try {
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        
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
                        <h3 className="posts-title">Create Posts</h3>
                        <Button onClick={handleBack} title="◀️ Go Back" variant='outline-danger'/>
                    </div>
                    <div>
                        <FormPosts onSubmit={handleCreate}/>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default createPosts