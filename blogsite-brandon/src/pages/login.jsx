import JSlogo from '../assets/logo.png'
import './login.css'

import http from '../helpers/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Swal from 'sweetalert2'

function login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        setError('')

        try {
            console.log(email,password, '<<<email & password')
            let loginResp = await http({
                method: 'post',
                url: '/login',
                data: {
                    email: email,
                    password: password
                }
            })

            const {accessToken} = loginResp.data
            localStorage.setItem('access_token', accessToken)
            navigate('/')

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

    const handleBack = () => {
        try {
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('access_token')){
            navigate('/')
        }
    },[])
    
    return(
        <>
            <div className='header-container'>
                <div className='header-login-container'>
                    <div className='header-login'>
                        <img src={JSlogo} className='image-header-login'/>
                    </div>
                    <h2 className='login-title'>Welcome Back!</h2>
                    <p className='login-desc'>DOT JS Community is a community of 1,000,000 developers</p>
                    <form className='login-form' onSubmit={handleLogin}>
                        <div className="mb-3 login-email-password">
                        {error && <h5 className='error-text'>{error}</h5>}
                            <div>
                                <label className="form-label login-label">Email</label>
                                <input type="email" className="form-control" value={email} onChange={(event) => {
                                    setEmail(event.target.value)
                                }}/>
                            </div>
                        
                            <div>
                                <label className="form-label login-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(event)=>{
                                    setPassword(event.target.value)
                                }}/>
                            </div>
                            <Button type='submit' title='Login' variant='success' className='submit-login'/>
                            <Button onClick={handleBack} title='Cancel' variant='outline-dark' className='submit-login'/>
                        </div>
                    
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default login