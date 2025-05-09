import JSlogo from '../assets/logo.png'
import './register.css'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import http from '../helpers/axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

function register(){
    const token = localStorage.getItem('access_token')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState('')

    const navigate = useNavigate()
    const handleBack = () => {
        try {
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleRegister = async(body) =>{
        try{
            await http({
                method:'POST',
                url:'/add-user',
                data: body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/login')
        }
        catch(error){
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

    return(
        <>
            <div className='header-container'>
                <div className='header-login-container'>
                    <div className='header-login'>
                        <img src={JSlogo} className='image-header-login'/>
                    </div>
                    <h2 className='login-title'>Register Staff</h2>
                    <p className='login-desc'>Please fill all the input form below to register new staff</p>
                    <form className='login-form login-form' onSubmit={(event)=>{
                        event.preventDefault()
                        handleRegister({
                            username: username,
                            email: email,
                            password: password,
                            phoneNumber: phoneNumber,
                            address: address
                        })
                    }}>
                        <div className="mb-3 login-email-password">
                            <div>
                                <label className="form-label login-label">Username</label>
                                <input type="text" className="form-control" onChange={(event)=>{
                                    setUsername(event.target.value)
                                }}/>
                            </div>
                            <div>
                                <label className="form-label login-label">Email</label>
                                <input type="email" className="form-control" onChange={(event)=>{
                                    setEmail(event.target.value)
                                }}/>
                            </div>
                        
                            <div>
                                <label className="form-label login-label">Password</label>
                                <input type="password" className="form-control" onChange={(event)=>{
                                    setPassword(event.target.value)
                                }}/>
                            </div>
                            <div>
                                <label className="form-label login-label">Phone Number</label>
                                <div className='input-group mb3'>
                                    <span className='input-group-text'>+62</span>
                                    <input type="number" className="form-control" onChange={(event)=>{
                                        setPhoneNumber(event.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div>
                                <label className="form-label login-label">Address</label>
                                <input type="text" className="form-control" onChange={(event)=>{
                                    setAddress(event.target.value)
                                }}/>
                            </div>
                            <div className='button-container'>
                                <Button type='submit' variant='primary' title='Register' className='btn btn-success'/>
                                <Button onClick={handleBack} title='Cancel' variant='outline-dark' className='submit-login'/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default register