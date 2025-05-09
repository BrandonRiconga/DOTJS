import { Outlet, useNavigate } from "react-router"
import Navbar from '../components/navbar'
import { useEffect } from "react"

function LoggedinLayout(){
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('access_token')){
            return navigate('/login')
        }
    },[])
    
    return(
        <>
        <Navbar/>

        <Outlet/>
        </>
    )
}

export default LoggedinLayout