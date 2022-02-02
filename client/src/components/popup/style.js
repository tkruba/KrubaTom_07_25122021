import styled from "styled-components";

export const SPopupArea = styled.div`
    background-color: hsla(0, 0%, 25%, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999999;
`;

export const SPopup = styled.div`
    width: 80%;
    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 1em;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 30px hsla(0, 0%, 0%, 0.3);
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 2em;

    @media screen and (min-width: 768px) and (max-width: 1439px) {
        width: 50%;
    }
    
    @media screen and (min-width: 1440px) {
        width: 25%;
    }
`;

export const SPopupHeader = styled.div`
    display: flex;
    align-items: center;
    height: 3em;
    width: 95%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
`;

export const SPopupClose = styled.button`
    width: 1.2em;
    height: 1.2em;
    font-size: 1.6em;
    color: hsla(10, 99%, 65%, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 1em;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.8);
    border: none;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    transition: background-color 0.5s, color 0.5s;

    &:hover {
        background-color: hsla(10, 75%, 50%, 0.5);
        color: white;
    }

    & svg {
        margin-right: 1px;
        margin-bottom: 1px;
    }
`;

export const SPopupTitle = styled.span`
    color: white;
    font-size: 1.2em;
    margin-left: 0.3em;
`;

export const SPopupButtons = styled.div`
    width: 90%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
`;

export const SPopupButton = styled.button`
    width: 45%;
    border: none;
    padding: 0.4em 1em;
    color: hsla(0, 0%, 100%, 1);
    font-size: 1em;
    background-color: ${props => props.confirm ? 'hsla(10, 75%, 50%, 0.5)' : 'hsla(0, 0%, 50%, 0.5)'};
    border-radius: 1em;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.8);
    border: none;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    cursor: pointer;
    transition: background-color 0.5s;
    text-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.8);

    &:hover {
        background-color: hsla(10, 75%, 50%, 0.5);
    }
`;
