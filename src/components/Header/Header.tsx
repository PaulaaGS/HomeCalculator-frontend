import styled from 'styled-components'
import React from 'react';

const H1 = styled.h1`
    font-size: 35px;
    background: #cef1ce;
    padding: 5px;
    color: #163516;
    justify-content: space-between;
    text-align: center;
`

export const Header = () => {
    return (
        <>
            <H1>Home Calculator</H1>
        </>
    );
};