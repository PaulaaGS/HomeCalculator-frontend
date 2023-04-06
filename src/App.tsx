import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ExpenseListView } from './components/ExpenseList/ExpenseList';
import { Layout } from './components/Layout/Layout';
import { SummaryView } from './components/Summary/Summary';
import { ExpenseView } from './components/Expense/Expense';
import { EditExpenseView } from './components/EditExpense/EditExpense';

export const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' element={<SummaryView />} />
                    <Route path='/expenses' element={<ExpenseListView />} />
                    <Route
                        path='/expenses/:idOfExpense'
                        element={<ExpenseView />}
                    />
                    <Route
                        path='/expenses/edit/:idOfExpense'
                        element={<EditExpenseView />}
                    />
                </Routes>
            </Layout>
        </>
    );
};
