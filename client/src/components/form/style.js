import styled from 'styled-components';

export const SForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    margin: 0.5em;
`;

export const SLabel = styled.label`
    position: relative;
    flex-basis: 100%;
    margin-bottom: 0.2em;
    margin-left: 0.75em;
    color: white;
`;

export const SInput = styled.input`
    flex-basis: 100%;
    margin-bottom: 1em;
    height: 2em;
    border: none;
    background-color: hsla(0, 0%, 50%, 0.5);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 50%, 0.3);
    border-radius: 1em;
    padding-left: 1em;
    color: hsla(0, 0%, 100%, 1);

    &::placeholder {
        color: hsla(0, 0%, 100%, 0.6);
    }
`;

export const SSubmit = styled.input`
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    margin-top: 1em;
    border: none;
    padding: 1em;
    text-transform: uppercase;
    color: hsla(0, 0%, 100%, 1);
    font-size: 1em;
    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 2em;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 50%, 0.3);
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover {
        background-color: hsla(10, 75%, 50%, 0.5);
    }
`;