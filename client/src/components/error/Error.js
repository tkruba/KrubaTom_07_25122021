import React from 'react';

import { SError, SErrorTitle, SErrorMessage } from './style.js';

// Bloc erreur
const Error = (props) => {

    return (
        <SError>
            <SErrorTitle>⚠️ ERREUR ⚠️</SErrorTitle>
            <SErrorMessage>{props.message}</SErrorMessage>
        </SError>
    );
};

export default Error;