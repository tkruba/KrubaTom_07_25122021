import React from 'react';

import Header from '../components/header/Header';
import Error from '../components/error/Error';

// Page Erreur 404
const NotFound = () => {
    return (
        <div>
            <Header />
            <Error message={'404 Page introuvable'}/>
        </div>
    );
};

export default NotFound;