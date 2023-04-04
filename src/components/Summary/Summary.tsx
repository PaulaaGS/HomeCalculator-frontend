import React, { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';
import { Summary } from '../../interfaces/summary';
import { Currency } from './Currency';

const Container = styled.div`
    padding: 5px;
    color: #163516;
    justify-content: center;
    display: flex;
    width: 40%;
    margin: 0 auto;
    `

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};


export const SummaryView = () => {

  const [summary, setSummary] = useState<Summary>({ expensesSum: 0, expensesPaid: 0 });

  useEffect(() => {
    (async () => {

      const res = await fetch(`http://localhost:3001/summary`);
      const data = await res.json();

      setSummary(data);

    })();

  }, []);

  return (
    <Container>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText primary="All expenses" />
          <Currency amount={summary.expensesSum} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="How much you spent" />
          <Currency amount={summary.expensesPaid} />
        </ListItem>
      </List>
    </Container>
  );
}