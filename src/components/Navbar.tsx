import React from 'react'
import { Link } from 'react-router-dom';

interface NavbarProps {
    children?: React.ReactNode;
}
const Navbar = ({ children }: NavbarProps) => {
    return (
        <div>
            <nav className="bg-blue-500 w-full fixed z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <span className="text-white text-2xl font-semibold whitespace-nowrap">User Management</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="" aria-controls="navbar-default" aria-expanded="false">
                        <img src='https://adaymagazine.com/wp-content/uploads/2018/12/the-toys-19.jpg' alt='auth-img' className="object-cover h-12 w-12 rounded-full" />
                    </button>
                </div>
            </nav>
            <div className='pt-20'>
                {children}
            </div>
        </div>

    )
}

export default Navbar;