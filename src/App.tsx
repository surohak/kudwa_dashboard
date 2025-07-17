import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';

const App = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default App;
