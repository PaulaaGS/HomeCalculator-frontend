import React from 'react';
import { Header } from '../Header/Header';

type LayoutProps = {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}