import './sideLogin.css'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function sideLogin(){
    const navigate = useNavigate()
    const handleLogin = () => {
        try{
            navigate('./login')
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div className="intro-div">
            <h4 className='intro-title'>
                DOT JS Community is a community of 1,000,000 amazing Javascript developers
            </h4>
            <p className='intro-desc'>
                This is the place where developers stay-up-to-date and stay-up-late
                everyday sharing their code with you. Join Us Now!
            </p>
            <div className='intro-login'>
                <Button onClick={handleLogin} title='Login' variant='outline-success btn-side-intro'/>
            </div>
        </div>
    )
}

export default sideLogin