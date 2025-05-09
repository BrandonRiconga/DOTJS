import './sideNav.css'
import { NavLink } from 'react-router-dom'

function SideNav(){
    const token = localStorage.getItem('access_token')

    return (
        <>
            <div className='side-navigation'>
                <h4>Go To</h4>
                <NavLink to='/' className='side-links'>
                    🏠 Home
                </NavLink>
                <a className='side-links'>🗔 DEV JS <small style={{color: 'rgb(80,80,80)'}}>(Coming Soon)</small></a>
                <a className='side-links'>🆘 Help <small style={{color: 'rgb(80,80,80)'}}>(Coming Soon)</small></a>
                <a className='side-links'>☎️ Contact <small style={{color: 'rgb(80,80,80)'}}>(Coming Soon)</small></a>
                {token && (
                    <NavLink to='/posts/' className='side-links'>
                        📜 Manage Posts
                    </NavLink>
                )}
                {token && (
                    <NavLink to='/category' className='side-links'>
                        🏷️ List Category
                    </NavLink>
                )}
            </div>
        </>
    )
}

export default SideNav