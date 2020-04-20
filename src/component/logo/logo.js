import React from 'react';
import logoImg from './job.jpg';
import './logo.css';


const Logo = () => {

    return (
        <div className='logo-container'>
            <img src={logoImg} alt='' />
        </div>
    );
};

export default Logo;