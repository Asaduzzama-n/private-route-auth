import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(result => {
                // console.log("Sign out successful", result)
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    return (
        <div>
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <Link to={'home'} className="btn btn-ghost normal-case text-xl">Private-Route</Link>
                    <p className='text-xl font-bold'>{user?.email}</p>

                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 ">
                        <li className='mx-2'><Link to={'home'}>Home</Link></li>
                        <li className='mx-2'><Link to={'order'}>Order</Link></li>
                        {
                            user?.email ? <li> <button onClick={handleSignOut}>Logout</button></li> : <li className='mx-2'><Link to={'login'}>Login</Link></li>
                        }
                        <li className='mx-2'><Link to={'register'}>Register</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;