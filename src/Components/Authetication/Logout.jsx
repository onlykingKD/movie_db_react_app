import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {

    const { user, logout } = useAuth0();

    return (
            <button
              class="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800"
              onClick={() => logout()}
            >

              Logout
            </button>
        
    );
};

export default Logout
