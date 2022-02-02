import styled from "styled-components";

export const SHeader = styled.div`
    width: 100%;
    height: 4em;
    min-height: 4em;
    max-height: 4em;
    position: sticky;
    margin-bottom: 1em;
    background-color: white;
    box-shadow: 0 0 30px hsla(0, 0%, 0%, 0.4);
    overflow: hidden;
`;

export const SHeaderImage = styled.img`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -50%);
    max-width: 375px;
`;