import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GeneratorPage } from './pages/Generator';
import { PaymentsPage } from './pages/Payments';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

