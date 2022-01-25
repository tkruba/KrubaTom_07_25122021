import styled from 'styled-components';

const Link = ({ className, to, children }) => (
    <a href={to} className={className}>
        {children}
    </a>
);

export const SDiv = styled.div`
    position: relative;
    width: 90%;
    padding: 0.5em;
    left: 50%;
    transform: translateX(-50%);
    background-color: hsla(0, 0%, 50%, 0.4);
    border-radius: 1em;
    margin-bottom: 2em;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 20px hsla(0, 0%, 0%, 0.4);
`;

export const SData = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const SProfilePic = styled.img`
    width: 2.4em;
    border-radius: 2em;
`;

export const SUser = styled(Link)`
    color: white;
    text-decoration: none;
    margin-left: 0.5em;
    font-size: 1.2em;
    text-shadow: hsla(0, 0%, 0%, 0.5) 0px 0 10px;
    transition: text-shadow 0.5s, color 0.5s;

    &:hover {
        color: hsla(10, 99%, 65%, 1);
        text-shadow: hsla(0, 0%, 0%, 1) 0px 0px 10px;
    }
`;

export const SActions = styled.div`
    margin-left: auto;
    margin-right: 0.5em;

    & span:not(:last-child) {
        margin-right: 0.8em;
    }

    & span {
        cursor: pointer;
        font-size: 1.2em;
    }
`;

export const SAction = styled.span`
    color: white;
    text-shadow: hsla(0, 0%, 0%, 0.5) 0px 0 10px;
    transition: text-shadow 0.5s, color 0.5s;

    &:hover {
        color: hsla(10, 99%, 65%, 1);
        text-shadow: hsla(0, 0%, 0%, 1) 0px 0px 10px;
    }
`;

export const SActionAdmin = styled.span`
    color: #d62500;
    text-shadow: hsla(0, 0%, 0%, 0.5) 0px 0 10px;
    transition: text-shadow 0.5s, color 0.5s;
    
    &:hover {
        color: hsla(10, 99%, 65%, 1);
        text-shadow: hsla(0, 0%, 0%, 1) 0px 0px 10px;
    }
`;

export const SMessage = styled.p`
    margin-top: 1em;
    margin-bottom: 0;
`;

export const SImage = styled.img`
    margin-top: 1em;
    position: relative;
    max-width: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1em;
`;