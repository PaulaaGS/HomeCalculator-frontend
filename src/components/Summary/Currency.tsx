import React from 'react';
import styled from 'styled-components';
import { getAmountWithCurrency } from '../../utils/utils';

const Container = styled.div`
    font-size: 20px;
`;

type CurrencyProps = {
    amount: number;
};

export const Currency = (props: CurrencyProps) => {
    return <Container>{getAmountWithCurrency(props.amount)}</Container>;
};
