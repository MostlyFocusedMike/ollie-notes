import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import appContext from '../context';

const Users = () => {
    const context = useContext(appContext);
    return (
        <nav id='nav-main'>
            <ul>
                <li><Link to='/' id='nav-logo'>Ollie Notes</Link></li>
                <li><Link to='/users'>Users</Link></li>
                {
                    context.loggedInUser
                        ? <Fragment>
                            <li><Link to={`/users/${context.loggedInUser}`}>Profile</Link></li>
                            <li><Link to={`/users/${context.loggedInUser}/notes`}>Notes</Link></li>
                        </Fragment>
                        : <li><Link to='/login'>Login</Link></li>
                }
            </ul>
        </nav>
    );
};

export default Users;
