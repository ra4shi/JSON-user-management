import React from 'react'
import '../layout.css'
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation()
    const userMenu = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'profile',
            path: '/profile'
        },
        {
            name: 'Logout',
            path: '/logout'
        }
    ];
    const menuToBeRenered = userMenu
    return (

        <div className='main'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1>USER</h1>
                    </div>

                    <div className='menu'>
                        {menuToBeRenered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        })}
                    </div>

                </div>

                <div className='content'>
                    <div className='header'>
                        <div className='p2'>user</div>
                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>


            </div>
        </div>


    )
}

export default Layout