import './editPosts.css'

import SideNav from "../components/sideNav"
import FormPosts from '../components/formPosts'

import Button from "../components/Button"
import http from "../helpers/axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2"

function editPosts(){
    const navigate = useNavigate()
    const params = useParams()
    const token = localStorage.getItem('access_token')
    const [posts, setPosts] = useState({})
    
    async function getPosts(){
        try {
           const getResponse = await http({
            method:'GET',
            url:"posts/" + params.id,
            headers:{
                'Authorization': `Bearer ${token}`
            }
           })
           const dataPosts = getResponse
           setPosts(dataPosts)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (body) => {
        try {
            await http({
                method: 'PUT',
                url: 'posts/' + params.id,
                data: body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/posts')
        } catch (error) {
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
        getPosts()
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
                        <h3 className="posts-title">Edit Posts</h3>
                        <Button onClick={handleBack} title="◀️ Go Back" variant='outline-danger'/>
                    </div>
                    <div>
                        <FormPosts defaultValue={posts} onSubmit={handleEdit}/>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default editPosts