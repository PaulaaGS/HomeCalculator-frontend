import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Summary } from '../../interfaces/summary';
import { API_BASE_URL } from '../../utils/base-url';
import { OrangeButton } from '../Button/OrangeButton';
import { Currency } from './Currency';
import { Spinner } from '../Spinner/Spinner';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [summary, setSummary] = useState<Summary>({
        expensesSum: 0,
        expensesPaid: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);

            try {
                const res = await fetch(`${API_BASE_URL}/summary`);
                const data = await res.json();

                setSummary(data);
            } catch {
                toast('Coś poszło nie tak!', { type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return <Spinner />;
    }

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
                    <OrangeButton width={200}>Lista wydatków</OrangeButton>
                </NavLink>
            </Box>
        </>
    );
};
