import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import '../styles/globals.css';

import { userService } from '../services';
import { Nav, Alert } from '../components';

export default App;

function App({ Component, pageProps }) {

    

    return (
        <>
            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />


                    <Component {...pageProps} />
            
            </div>

        </>
    );
}
