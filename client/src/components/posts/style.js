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

    @media screen and (min-width: 768px) and (max-width: 1439px) {
        width: 50%;
    }
    
    @media screen and (min-width: 1440px) {
        width: 25%;
    }
`;

export const SData = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const SProfilePic = styled.img`
    width: ${props => props.comment ? '1.4em' : '2.4em'};
    border-radius: 2em;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`;

export const SUser = styled(Link)`
    color: white;
    text-decoration: none;
    margin-left: 0.5em;
    font-size: ${props => props.comment ? '1em' : '1.2em'};
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
    font-size: 1.2em;

    & span:not(:last-child) {
        margin-right: 0.8em;
    }
`;

export const SAction = styled.span`
    color: white;
    text-shadow: hsla(0, 0%, 0%, 0.5) 0px 0 10px;
    transition: text-shadow 0.5s, color 0.5s;
    cursor: pointer;

    &:hover {
        color: hsla(10, 99%, 65%, 1);
        text-shadow: hsla(0, 0%, 0%, 1) 0px 0px 10px;
    }
`;

export const SActionAdmin = styled.span`
    color: #d62500;
    text-shadow: hsla(0, 0%, 0%, 0.5) 0px 0 10px;
    transition: text-shadow 0.5s, color 0.5s;
    cursor: pointer;

    ${props => props.comment ? `
        margin-left: auto;
        margin-right: 0.5em;` : null};

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

export const SCommentsControl = styled.div`
    margin-left: auto;
    margin-right: 0.5em;
    margin-top: 1em;
    border-top: 1px solid hsla(0, 0%, 100%, 0.3);
    padding-top: 0.5em;
`;

export const SComments = styled.div`
    position: relative;
    width: 90%;
    padding: 0.5em;
    left: 50%;
    transform: translateX(-50%);
    background-color: hsla(0, 0%, 50%, 0.4);
    border-radius: 1em;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
    border-top: 2px solid hsla(0, 0%, 100%, 0.3);
    border-left: 2px solid hsla(0, 0%, 100%, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 20px hsla(0, 0%, 0%, 0.4);
`;

export const SComment = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 0.4em;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.3);
    padding-bottom: 0.4em;
`;

export const SCommentMessage = styled.span`
    flex-basis: 100%;
    margin-left: 1em;
    margin-top: 0.2em;
`;
