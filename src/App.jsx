import { useEffect, useState } from 'react';
import { Hero, Modal, Nav, Routing } from './components';
import { getCityRoutes } from './api/index';
import bus from './asset/bus-hero.jpg';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className='relative w-full h-full bg-auto overflow-x-hidden'>
        <Nav />
        <img
          src={bus}
          alt='Bus'
          className='w-full absolute top-0 z-[-100] bg-top bg-cover '
        />
      </div>
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
    </>
  );
}

export default App;
