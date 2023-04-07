import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';

type LayoutProps = {
    children: React.ReactNode;
};

const Background = styled.div`
    background: #fbf6f0;
    height: 100vh;
`;

const Main = styled.main`
    padding-top: 20px;
`;

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Background>
            <Header />
            <Main>{children}</Main>
        </Background>
    );
};
