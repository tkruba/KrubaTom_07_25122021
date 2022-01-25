import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SMainActionButton, SActiveMenu, SMenuItem } from './style';

import { UserContext } from '../../UserContext';

const MainActionButton = () => {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [menuActive, setMenuState] = useState(false);

    const changeState = () => {
        if (!menuActive) return setMenuState(true);
        return setMenuState(false);
    };

    const logout = () => {
        fetch('http://localhost:3000/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => {
            if (!res.ok) throw new Error(res.json());
            return res.json();
        })
        .then(res => {
            navigate('/login');
            setUser(null);
        })
        .catch(err => console.error(err.error));
    };

    //    <img src='http://localhost:3000/images/icon.svg'></img>

    return (
        <SMainActionButton state={menuActive} onClick={() => changeState()}>
            {menuActive ?
                <SActiveMenu>
                    <SMenuItem>Voir mon profil.</SMenuItem>
                    <SMenuItem>Écrire un post.</SMenuItem>
                    <SMenuItem onClick={() => logout()}>Se déconnecter.</SMenuItem>
                </SActiveMenu> : null}
        </SMainActionButton>
    );
};

export default MainActionButton;