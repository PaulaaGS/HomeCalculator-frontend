import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';
import { Summary } from '../../interfaces/summary';
import { Currency } from './Currency';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
    padding: 5px;
    color: #163516;
    justify-content: center;
    display: flex;
    width: 40%;
    margin: 0 auto;
    font-weight: bold;
`;

const style = {
    width: '100%',
};

export const SummaryView = () => {
    const [summary, setSummary] = useState<Summary>({
        expensesSum: 0,
        expensesPaid: 0,
    });

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/summary');
            const data = await res.json();

            setSummary(data);
        })();
    }, []);

    return (
        <>
            <Container>
                <List sx={style} component='nav'>
                    <ListItem divider>
                        <ListItemText primary='Suma wszystkich wydatków' />
                        <Currency amount={summary.expensesSum} />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary='Zapłacona kwota' />
                        <Currency amount={summary.expensesPaid} />
                    </ListItem>
                </List>
            </Container>
            <Box margin={'20px 0'} textAlign={'center'}>
                <NavLink style={{ textDecoration: 'none' }} to='/expenses'>
                    <Button
                        variant='contained'
                        sx={{
                            ':hover': {
                                backgroundColor: '#e07824',
                            },
                            backgroundColor: '#f48529',
                        }}
                    >
                        Lista wydatków
                    </Button>
                </NavLink>
            </Box>
        </>
    );
};
