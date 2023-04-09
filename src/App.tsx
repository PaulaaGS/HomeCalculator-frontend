import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ExpenseListView } from './components/ExpenseList/ExpenseListView';
import { Layout } from './components/Layout/Layout';
import { SummaryView } from './components/Summary/Summary';
import { ExpenseView } from './components/Expense/ExpenseView';
import { EditExpenseView } from './components/EditExpense/EditExpenseView';
import { AddExpenseView } from './components/AddExpense/AddExpenseView';

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
                    <Route path='/expenses/add' element={<AddExpenseView />} />
                </Routes>
            </Layout>
        </>
    );
};
