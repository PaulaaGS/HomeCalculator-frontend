import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    font-size: 20px;
`

type CurrencyProps = {
    amount: number
}

export const Currency = (props: CurrencyProps) => {
    return (
        <Container>
            {props.amount.toFixed(2)} zł
        </Container>
    )
}