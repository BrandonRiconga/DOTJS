import './detailPosts.css'

import { useNavigate, useParams } from 'react-router-dom'
import http from '../helpers/axios'
import { useEffect, useState } from 'react'

import Navbar from '../components/navbar'
import SideNav from '../components/sideNav'
import Button from '../components/Button'

function detailPage(){
    const navigate = useNavigate()
    let {id} = useParams()
    const [posts, setPosts] = useState('')
    const getDetail = async() => {
        const response = await http({
            method: 'GET',
            url: `/pub/posts/${id}`
        })
        const postsData = response.data
        setPosts(postsData)
    }
    useEffect(()=>{
        getDetail()
    },[])

    const newDate = (date) =>{
        return new Date(date).toLocaleDateString('en-GB',{
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const handleBack = async() =>{
        try {
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        
        <>
        <Navbar/>
        <div className="body-post">
            <div className="container-posts">
                <div className='sidenav-container'>
                    <SideNav className='sidenav-styling'/>
                </div>
                <div className="main-content-detail">
                    <div>
                        <Button onClick={handleBack} title="Back" variant="outline-danger" className="detail-back-button"/>
                    </div>
                    <div className='detail-header-container'>
                        <h2 className="detail-title">{posts.title}</h2>
                    </div>
                    <div className='detail-bottom-header'>
                        <div className='tag-container'>
                            <h6>tags:</h6>
                            <button className='btn-tag btn btn-outline-dark'>{posts.Category && posts.Category.name}</button>
                        </div>
                        <div className='tag-container'>
                            <h6>posted at:</h6>
                            <p className='date-created'>{newDate(posts.createdAt)}</p>
                        </div>
                    </div>
                    
                    <div className='detail-body-container'>
                        <p>{posts.content}</p>
                    </div>
                    <div className='detail-image-container'>
                        <img src={posts.imgUrl} alt='Uploaded Image' className='image-detail'/>
                    </div>
                </div>
                <div className='side-user-info'>
                    <h4 className='detail-username'>{posts.User && posts.User.username}</h4>
                    <div className='detail-user-address'>
                        <h6>Email:</h6>
                        <p>{posts.User && posts.User.email}</p>
                    </div>
                    <div className='detail-user-address'>
                        <h6>Phone Number:</h6>
                        <p>{posts.User && posts.User.phoneNumber}</p>
                    </div>
                    <div className='detail-user-address'>
                        <h6>Address:</h6>
                        <p>{posts.User && posts.User.address}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default detailPage