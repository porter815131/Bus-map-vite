import { useEffect } from 'react';
import { Hero, Nav, Routing } from './components';
import { getCityRoutes } from './api/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route index path='home' element={<Hero />} exact />
        <Route path='route' element={<Routing />} />
      </Routes>
    </Router>
  );
}

export default App;
