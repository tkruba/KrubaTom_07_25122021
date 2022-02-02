import styled from "styled-components";

export const SMainActionButton = styled.div`
    z-index: 99999999;
    width: 3em;
    height: 3em;
    background-color: ${props => props.state ? "white" : "#fd2d01"};
    border-radius: 3em;
    position: fixed;
    bottom: 1em;
    right: 1em;
    cursor: pointer;
    transition: background-color 0.5s;
    box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.6);

    & > img {
        transition: filter 0.5s;
        ${props => props.state ? null : "filter: brightness(0) invert(1);"};
    }
`;

export const SActiveMenu = styled.div`
    z-index: 99999999;
    width: 9em;
    height: auto;
    position: absolute;
    right: 0;
    bottom: 3em;
    cursor: default;
`;

export const SMenuItem = styled.p`
    color: white;
    background-color: hsla(0, 0%, 40%, 0.5);
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.4);
    padding: 0.6em 0.4em;
    border-radius: 2em;
    text-align: center;
    text-shadow: hsla(0, 0%, 0%, 0.5) 0px 0 10px;

    transition: background-color 0.5s;

    &:hover {
        background-color: hsla(10, 75%, 50%, 0.6);
    }
`;