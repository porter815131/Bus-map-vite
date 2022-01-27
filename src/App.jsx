import { useEffect, useState } from 'react';
import { Hero, Modal, Nav, Routing } from './components';
import { getCityRoutes } from './api/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          index
          path='home'
          element={<Hero setIsLoading={setIsLoading} />}
          exact
        />
        <Route
          path='route'
          exact
          element={<Routing setIsLoading={setIsLoading} />}
        />
      </Routes>
      <Modal isLoading={isLoading} />
    </Router>
  );
}

export default App;
