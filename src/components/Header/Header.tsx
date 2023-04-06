import styled from 'styled-components';
import React from 'react';

const H1 = styled.h1`
    font-family: cursive;
    font-size: 35px;
    background: #80dacb;
    padding: 20px;
    color: #163516;
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
