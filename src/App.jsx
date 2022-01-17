import { useEffect } from 'react';
import { Nav, Routing } from './components';
import { getCityRoutes } from './api/index';

function App() {
  return (
    <div>
      <Nav />
      <Routing />
    </div>
  );
}

export default App;
