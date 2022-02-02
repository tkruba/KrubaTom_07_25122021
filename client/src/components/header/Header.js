import React from 'react';

import { SHeader, SHeaderImage } from './style';

// Header le page
const Header = () => {
    return (
        <SHeader>
            <a href="/">
                <SHeaderImage alt="Logo groupomania" src={process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/images/icon-left-font.svg'}></SHeaderImage>
            </a>
        </SHeader>
    );
};

export default Header;