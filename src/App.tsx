import './App.css';
import { Layout } from './components/Layout/Layout';
import { SummaryView } from './components/Summary/Summary';

export const App = () => {
  return (
    <>
      <Layout>
        <SummaryView/>
      </Layout>
    </>
  );
}

