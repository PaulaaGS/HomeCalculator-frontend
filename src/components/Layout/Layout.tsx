import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';

type LayoutProps = {
    children: React.ReactNode;
};

const Background = styled.h1`
    background: linear-gradient(
        180deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(41, 166, 146, 1) 0%,
        rgba(255, 255, 255, 1) 100%,
        rgba(242, 242, 242, 1) 100%,
        rgba(126, 207, 172, 1) 100%,
        rgba(30, 212, 129, 1) 100%,
        rgba(11, 212, 208, 1) 100%,
        rgba(0, 212, 255, 1) 100%
    );
    margin-top: auto;
`;

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Background>
            <Header />
            <main>{children}</main>
        </Background>
    );
};
