import styled from "styled-components";

export const SProfile = styled.div`
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
    margin-bottom: 3em;

    @media screen and (min-width: 768px) and (max-width: 1439px) {
        width: 50%;
    }
    
    @media screen and (min-width: 1440px) {
        width: 25%;
    }
`;

export const SProfileUser = styled.h1`
    flex-basis: 100%;
    color: white;
    text-align: center;
    text-shadow: 0px 0px 30px hsla(0, 0%, 30%, 0.8);
    margin-top: 0.2em;
    padding-bottom: 0.4em;
    border-bottom: 1px solid hsla(0, 0%, 90%, 0.8);
`;

export const SProfilePicture = styled.img`
    width: 90%;
    border-radius: 50%;
    box-shadow: 0px 0px 20px hsla(0, 0%, 30%, 0.8);
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`;

export const SProfileEmailContainer = styled.p`
    color: white;
    font-size: 1.2em;
    text-shadow: 0px 0px 30px hsla(0, 0%, 30%, 0.8);
    flex-basis: 100%;
`;

export const SProfileEmail = styled.a`
    color: hsla(10, 99%, 65%, 1);
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const SProfileActions = styled.div`
    border-top: 1px solid hsla(0, 0%, 90%, 0.8);
    width: 90%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    padding-top: 1.5em;
    padding-bottom: 1.3em;
`;

export const SProfileButtons = styled.button`
    border: none;
    padding: 0.4em 1em;
    color: hsla(0, 0%, 100%, 1);
    font-size: 1em;
    background-color: ${props => props.admin ? 'hsla(10, 75%, 50%, 0.5)' : 'hsla(0, 0%, 50%, 0.5)'};
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