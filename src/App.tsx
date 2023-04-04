import './App.css';
import { ExpenseListView } from './components/ExpenseList/ExpenseList';
import { Layout } from './components/Layout/Layout';
import { SummaryView } from './components/Summary/Summary';

export const App = () => {
    return (
        <>
            <Layout>
                <SummaryView />
                <ExpenseListView />
            </Layout>
        </>
    );
};
