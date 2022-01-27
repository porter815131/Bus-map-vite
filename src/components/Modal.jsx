import React from 'react';
import loading from '../asset/loading-bus.gif';

const Modal = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white'>
          <div className='relative w-auto my-6 mx-auto max-w-3xl '>
            <div className=' relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              <div className='relative p-6 flex-auto  '>
                <img src={loading} alt='Bus loading' className='' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
