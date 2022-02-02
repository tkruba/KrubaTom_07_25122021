import styled from "styled-components";

export const SError = styled.div`
    display: flex;
    width: 90%;
    padding: 0.5em;
    flex-wrap: wrap;
    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 1em;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 30px hsla(0, 0%, 0%, 0.6);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;

    @media screen and (min-width: 768px) and (max-width: 1439px) {
        width: 50%;
    }
    
    @media screen and (min-width: 1440px) {
        width: 25%;
    }
`;

export const SErrorTitle = styled.h1`
    color: white;
`;

export const SErrorMessage = styled.p`
    margin-top: 0;
    color: white;
    font-size: 1.4em;
    text-shadow: 0px 0px 30px hsla(0, 0%, 30%, 0.8);
    flex-basis: 75%;
    text-align: center;
`;