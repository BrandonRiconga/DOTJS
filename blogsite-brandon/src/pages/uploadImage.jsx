import './uploadImage.css'

import SideNav from "../components/sideNav"

import Button from "../components/Button"
import http from "../helpers/axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function uploadImages(){
    const navigate = useNavigate()
    const params = useParams()
    const token = localStorage.getItem('access_token')
    const [images, setImages] = useState()
    const [preview, setPreview] = useState()

    const handleUpdate = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("postsImg",images)

        const loadingAlert = Swal.fire({
            title: 'Uploading Image...',
            text: 'Please wait a moment',
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        try {
            const response = await http({
                method: 'PATCH',
                url: `/posts/${params.id}`,
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const imagesData = response.data
            setImages(imagesData)

            navigate('/posts')
        } catch (error) {
            console.log(error)
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
        finally{
            loadingAlert.close()
        }
    } 

    const handleImage = async (event) => {
        const img = event.target.files[0]
        if(img){
            setImages(img)
            const readImg = new FileReader()

            readImg.onloadend = () => {
                setPreview(readImg.result)
            }

            readImg.readAsDataURL(img)
        }
    }
    
    const handleBack = async() => {
        try {
            navigate('/posts')
        } catch (error) {
            console.log(error)
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

    return(
        <>
        <div className="body-post">
            <div className="container-posts">
                <div className='sidenav-container'>
                    <SideNav className='sidenav-styling'/>
                </div>
                <div className="main-content-posts">
                    <div className='posts-header-container'>
                        <h3 className="posts-title">Upload Image</h3>
                        <Button onClick={handleBack} title="◀️ Go Back" variant='outline-danger'/>
                    </div>
                    <div>   
                        {preview && (
                            <img src={preview}
                            alt='Preview uploaded image'
                            className='preview-image'/>)}
                        <form className='form-image' onSubmit={handleUpdate}>
                            <input type='file' accept='image/*' onChange={handleImage} className='input-image-btn form-control'/>
                            <Button type='submit' variant='outline-success image-button-submit' title='Submit'/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default uploadImages