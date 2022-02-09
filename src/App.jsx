import { useEffect, useState } from 'react';
import { Hero, Modal, Nav, Routing, Footer, Error } from './components';
import { getCityRoutes } from './api/index';
import bus from './asset/bus-hero.jpg';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='flex flex-col relative w-[100%] h-full justify-between items-center overflow-hidden'>
      <img
        src={bus}
        alt='Bus'
        className='w-full h-full absolute object-cover top-0 z-[-100] bg-left'
      />
      {/* <div className='relative w-full h-full bg-auto overflow-x-hidden'> */}
      <Nav />
      {/* <img
          src={bus}
          alt='Bus'
          className='w-full absolute top-0 z-[-100] bg-top bg-cover '
        /> */}
      {/* </div> */}

      <Routes>
        <Route
          index
          path='/'
          element={<Hero setIsLoading={setIsLoading} />}
          exact
        />
        <Route
          path='route'
          exact
          element={<Routing setIsLoading={setIsLoading} />}
        />
        <Route path='*' exact element={<Error />} />
      </Routes>

      <Modal isLoading={isLoading} />
      <Footer />
    </div>
  );
}

export default App;
