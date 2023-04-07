import styled from 'styled-components';
import React from 'react';

const H1 = styled.h1`
    font-family: "Gill Sans", sans-serif;
    font-variant: small-caps;
    font-size: 35px;
    background: #2a5f4b;
    padding: 30px;
    color: #ffffff;
    text-align: center;
    margin-top: auto;
    border-color: black;
    border-bottom-style: outset;
`;

export const Header = () => {
    return (
        <>
            <H1>Home Calculator</H1>
        </>
    );
};
