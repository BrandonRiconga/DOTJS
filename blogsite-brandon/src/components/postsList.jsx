import './postsList.css'
import http from '../helpers/axios'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function postsList({posts, fetchPosts}){
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    const handleEdit = async(id) => {
            try {
                navigate(`./edit/${id}`)
            } catch (error) {
                let message = "Something went wrong"
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

    const handleDelete = async(id) =>{
        try {
            await http({
                method: 'DELETE',
                url: `/posts/${id}`,
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            fetchPosts()
        } catch (error) {
            let message = "Something went wrong"
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

    const handleUpload = async(id)=>{
        try {
            navigate(`./upload/${id}`)
        } catch (error) {
            let message = "Something went wrong"
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
        <tr key={posts.id}>
            <th scope="row" className='posts-table-data'>{posts.id}</th>
            <td className='posts-table-data'>{posts.title}</td>
            <td className='posts-table-data'>{posts.content}</td>
            <td className='posts-table-data'>{posts.imgUrl}</td>
            <td className='posts-table-data'>{posts.User.username}</td>
            <td className='action-table-post'>
                <Button onClick={()=> handleEdit(posts.id)}  title='Edit' variant='outline-warning'/>
                <Button onClick={()=> handleDelete(posts.id)}title='Delete' variant='outline-danger' />
                <Button onClick={()=> handleUpload(posts.id)} title='Upload Image' variant='outline-primary' />
            </td>
        </tr>
    )
}
export default postsList