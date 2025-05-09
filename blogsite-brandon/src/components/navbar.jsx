import jsLogo from '../assets/logo.png'
import './navbar.css'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function Navbar(){
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()
    const handleLogin = () => {
        try{
            navigate('./login')
        }
        catch(error){
            console.log(error)
        }
    }
    const handleRegister = () => {
        try{
            navigate('./register')
        }
        catch(error){
            console.log(error)
        }
    }
    const handleLogout = () => {
        try {
            localStorage.removeItem('access_token')
            navigate('./login')
        } catch (error) {
            console.log(error)
        }
        
      }
    return(
        <nav
            className="navbar bg-light sticky-top">
            <div
              className="container-fluid">
              <a
                className="navbar-brand"
                href="#">
                <img
                  src={jsLogo}
                  className="logoNavbar d-inline-block align-text-top"/>
                <h3>DOT JS</h3>
              </a>
              {!token && 
                <div className='navbar-login-create'>
                    <Button variant='outline-success' onClick={handleLogin} title='Login'/>
                </div>
              }
              {
                token &&
                <div className='navbar-logout-create'>
                    <Button variant='outline-primary' onClick={handleRegister} title='Create Staff'/>
                    <Button variant='outline-danger' onClick={handleLogout} title='Logout'/>
                </div>
              }
            </div>
        </nav>
    )
}

export default Navbar