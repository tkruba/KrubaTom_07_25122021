import styled, {css} from 'styled-components';

export const SForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    margin: 0.5em;
`;

export const SLabel = styled.label`
    position: relative;
    flex-basis: 100%;
    margin-bottom: 0.4em;
    margin-left: 0.75em;
    color: white;
    text-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.8);

    ${props => props.hidden && css`display: none;`};
`;

export const SInput = styled.input`
    flex-basis: 100%;
    margin-bottom: 1em;
    height: 2em;
    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 1em;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.8);
    border: none;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    padding-left: 1em;
    color: hsla(0, 0%, 100%, 1);

    &::placeholder {
        color: hsla(0, 0%, 100%, 0.6);
    }
`;

export const SFormError = styled.p`
    flex-basis: 100%;
    background-color: hsla(10, 75%, 50%, 0.5);
    border-radius: 0.6em;
    border: 1px solid red;
    padding: 0.6em 1em;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    display: flex;
    flex-wrap: wrap;

    &:not(:last-child) {
        flex-basis: 100%;
    }
`;

export const SSubmit = styled.input`
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    margin-top: 1em;
    border: none;
    padding: 0.4em 1em;
    text-transform: uppercase;
    color: hsla(0, 0%, 100%, 1);
    font-size: 1em;
    background-color: hsla(0, 0%, 50%, 0.5);
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

export const SNewPostForm = styled.form`
    width: 85%;
    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 1em;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.5);
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    padding: 0.5em;
    margin-top: 0.5em;

    & label {
        margin-left: 0;
        transition: color 0.5s;
        &:hover {
            color: hsla(10, 99%, 65%, 1);
        }
    }
`;

export const SNewPostText = styled.textarea`
    margin-top: 0.2em;
    background-color: hsla(0, 0%, 50%, 0.5);
    border-radius: 1em;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px hsla(0, 0%, 30%, 0.8);
    border: none;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    width: 100%;
    height: 12em;
    resize: vertical;
    padding: 0.4em;
    margin-bottom: 1em;
`;

export const SNewPostFileInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

export const SNewPostFileName = styled.span`
    color: hsla(10, 99%, 65%, 1);
    width: 100%;
    min-width: 100%;
    word-wrap: break-word;
`;